#!/usr/bin/env python3
"""Safely standardize the primary navbar and footer on the affected HTML pages.

The script is deliberately opt-in:

    python scripts/standardize_static_nav_footer.py
        Dry-run. Prints the planned changes and writes nothing.

    python scripts/standardize_static_nav_footer.py --apply
        Applies changes to the explicit allowlist and creates backups first.

It reuses the existing public/static-nav.js and public/static-nav.css
implementation. It does not touch Next.js routes or any HTML file outside the
allowlist below. Breadcrumbs, article content, schemas, in-page navigation,
and other scripts are preserved.
"""

from __future__ import annotations

import argparse
import re
import shutil
from dataclasses import dataclass, field
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable


STATIC_CSS_TAG = '<link rel="stylesheet" href="/static-nav.css?v=3" data-em-static-nav>'
STATIC_JS_TAG = '<script src="/static-nav.js?v=3" defer data-em-static-nav></script>'

TARGET_FILES = (
    # About
    "public/about/about-us.html",
    "public/about/contact.html",
    "public/about/engine-warranty-guide.html",
    "public/about/how-engines-market-works.html",
    "public/about/supplier-standards.html",
    "public/about/warranty-claims-guide.html",
    # Case studies
    "public/case-studies/audi-a4-timing-chain-failure.html",
    "public/case-studies/audi-a6-oil-consumption.html",
    "public/case-studies/bmw-320d-engine-replacement.html",
    "public/case-studies/bmw-n47-timing-chain-failure.html",
    "public/case-studies/bmw-n57-engine-replacement.html",
    "public/case-studies/ford-ranger-engine-replacement.html",
    "public/case-studies/ford-transit-engine-failure.html",
    "public/case-studies/jaguar-ingenium-timing-chain.html",
    "public/case-studies/jaguar-xf-engine-replacement.html",
    "public/case-studies/land-rover-discovery-crank-failure.html",
    "public/case-studies/mercedes-om651-timing-chain.html",
    "public/case-studies/mercedes-sprinter-engine-replacement.html",
    "public/case-studies/nissan-navara-d40-case-study.html",
    "public/case-studies/peugeot-boxer-engine-replacement.html",
    "public/case-studies/range-rover-evoque-timing-chain.html",
    "public/case-studies/range-rover-sdv6-crankshaft-failure.html",
    "public/case-studies/toyota-hilux-engine-replacement.html",
    "public/case-studies/vauxhall-vivaro-engine-failure.html",
    "public/case-studies/vw-amarok-engine-replacement.html",
    "public/case-studies/vw-transporter-engine-rebuild.html",
    # Insights
    "public/insights/average-engine-replacement-times.html",
    "public/insights/engine-warranty-statistics-uk.html",
    "public/insights/most-common-engine-failures-uk.html",
    "public/insights/most-expensive-engine-repairs-uk.html",
    "public/insights/most-reliable-diesel-engines.html",
    "public/insights/most-reliable-petrol-engines.html",
    "public/insights/most-replaced-engines-uk.html",
    "public/insights/uk-engine-market-report-2026.html",
    "public/insights/uk-engine-price-index.html",
    "public/insights/uk-engine-replacement-statistics.html",
    # Legal
    "public/legal/complaints-procedure.html",
    "public/legal/cookie-policy.html",
    "public/legal/data-handlng-policy.html",
    "public/legal/privacy-policy.html",
    "public/legal/terms-and-conditions.html",
    # Prices
    "public/prices/crankshaft-repair-cost.html",
    "public/prices/dpf-replacement-cost.html",
    "public/prices/engine-fitting-cost.html",
    "public/prices/engine-replacement-cost.html",
    "public/prices/garage-labour-rates.html",
    "public/prices/gearbox-replacement-cost.html",
    "public/prices/head-gasket-repair-cost.html",
    "public/prices/injector-replacement-cost.html",
    "public/prices/rebuilt-engine-cost.html",
    "public/prices/reconditioned-engine-cost.html",
    "public/prices/remanfactured-engine-cost.html",
    "public/prices/timing-chain-replacement-cost.html",
    "public/prices/turbo-replacement-cost.html",
    "public/prices/used-engine-cost.html",
    "public/prices/vehicle-recovery-cost.html",
    # Services
    "public/services/engine-diagnostic.html",
    "public/services/engine-fitting.html",
    "public/services/engine-inspection-service.html",
    "public/services/engine-inspection.html",
    "public/services/engine-repair.html",
    "public/services/gearbox-replacement.html",
    "public/services/rebuilt-engines.html",
    "public/services/reconditioned-engines.html",
    "public/services/remanufactured-engines.html",
    "public/services/replacement-engines.html",
    "public/services/supply-and-fit.html",
    "public/services/used-engines.html",
    "public/services/vehicle-recovery.html",
    "public/services/gearbox-replacement/automatic.html",
    "public/services/gearbox-replacement/manual.html",
    # Symptoms
    "public/symptoms/black-smoke.html",
    "public/symptoms/blue-smoke.html",
    "public/symptoms/check-engine-light.html",
    "public/symptoms/coolant-loss.html",
    "public/symptoms/coolant-warning-light.html",
    "public/symptoms/dpf-warning-light.html",
    "public/symptoms/engine-knocking-noise.html",
    "public/symptoms/engine-overheating.html",
    "public/symptoms/engine-rattling-noise.html",
    "public/symptoms/engine-stalling.html",
    "public/symptoms/engine-ticking-noise.html",
    "public/symptoms/engine-wont-start.html",
    "public/symptoms/excessive-oil-consumption.html",
    "public/symptoms/exhaust-leak-sound.html",
    "public/symptoms/limp-mode.html",
    "public/symptoms/loss-of-power.html",
    "public/symptoms/metal-shavings-in-oil.html",
    "public/symptoms/oil-warning-light.html",
    "public/symptoms/rough-idle.html",
    "public/symptoms/white-smoke.html",
    # Top-level static authority page
    "public/reviews.html",
)

VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


@dataclass
class Element:
    tag: str
    attrs: dict[str, str]
    start: int
    start_tag_end: int
    end: int | None = None
    parent: "Element | None" = None
    children: list["Element"] = field(default_factory=list)

    @property
    def classes(self) -> set[str]:
        return set(self.attrs.get("class", "").split())


class OffsetParser(HTMLParser):
    """Collect element spans while preserving the original source text."""

    def __init__(self, source: str) -> None:
        super().__init__(convert_charrefs=False)
        self.source = source
        self.line_offsets = [0]
        for line in source.splitlines(keepends=True):
            self.line_offsets.append(self.line_offsets[-1] + len(line))
        self.stack: list[Element] = []
        self.elements: list[Element] = []

    def source_offset(self) -> int:
        line, column = self.getpos()
        return self.line_offsets[line - 1] + column

    def attrs_dict(self, attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {key.lower(): value or "" for key, value in attrs}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        start = self.source_offset()
        raw = self.get_starttag_text() or ""
        element = Element(
            tag=tag.lower(),
            attrs=self.attrs_dict(attrs),
            start=start,
            start_tag_end=start + len(raw),
            parent=self.stack[-1] if self.stack else None,
        )
        if element.parent:
            element.parent.children.append(element)
        self.elements.append(element)
        if element.tag not in VOID_TAGS:
            self.stack.append(element)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1].tag == tag.lower():
            self.stack.pop()

    def handle_endtag(self, tag: str) -> None:
        end_start = self.source_offset()
        end_tag_end = end_start + len(f"</{tag}>")
        tag = tag.lower()
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index].tag == tag:
                for element in self.stack[index:]:
                    element.end = end_tag_end
                del self.stack[index:]
                return


def descendants(element: Element) -> Iterable[Element]:
    for child in element.children:
        yield child
        yield from descendants(child)


def is_primary_element(element: Element) -> bool:
    classes = element.classes
    aria_label = element.attrs.get("aria-label", "").lower()

    if element.tag == "header":
        return bool(classes.intersection({"site-nav", "site-header", "header-wrap", "nav-bar", "nav"}))

    if element.tag != "nav":
        return False

    if "site-nav" in classes or "nav" in classes:
        return True

    return "header-nav" in classes and "main navigation" in aria_label


def has_primary_nav_descendant(element: Element) -> bool:
    return any(
        child.tag == "nav"
        and ("site-nav" in child.classes or "nav" in child.classes)
        for child in descendants(element)
    )


def primary_removal_nodes(parser: OffsetParser) -> list[Element]:
    candidates = [element for element in parser.elements if is_primary_element(element)]

    # Some legal pages wrap the primary <nav class="site-nav"> in an
    # otherwise unclassified <header>. Remove that wrapper as one block.
    candidates.extend(
        element
        for element in parser.elements
        if element.tag == "header"
        and not element.attrs.get("class")
        and has_primary_nav_descendant(element)
    )

    selected: list[Element] = []
    candidate_ids = {id(element) for element in candidates}
    for element in sorted(candidates, key=lambda item: item.start):
        ancestor = element.parent
        nested = False
        while ancestor:
            if id(ancestor) in candidate_ids:
                nested = True
                break
            ancestor = ancestor.parent
        if not nested:
            selected.append(element)
    return selected


def read_text_preserving_newlines(path: Path) -> str:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return handle.read()


def remove_spans(source: str, elements: Iterable[Element]) -> str:
    spans = sorted(
        ((element.start, element.end) for element in elements if element.end is not None),
        reverse=True,
    )
    result = source
    for start, end in spans:
        result = result[:start] + result[end:]
    return result


BREADCRUMB_CLASS_NAMES = {
    "nav-crumb",
    "nav-crumbs",
    "nav-breadcrumb",
    "nav-breadcrumbs",
}


def breadcrumb_descendants(element: Element) -> list[Element]:
    result: list[Element] = []
    for child in descendants(element):
        aria_label = child.attrs.get("aria-label", "").lower()
        if child.classes.intersection(BREADCRUMB_CLASS_NAMES) or "breadcrumb" in aria_label:
            if child.end is not None:
                result.append(child)
    return result


def remove_primary_and_footers(
    source: str,
    primary_nodes: list[Element],
    footer_nodes: list[Element],
) -> tuple[str, int]:
    replacements: list[tuple[int, int, str]] = []
    preserved_breadcrumb_count = 0

    for element in primary_nodes:
        preserved = breadcrumb_descendants(element)
        replacement = ""
        if preserved:
            # Keep the existing breadcrumb markup/content, but move it outside
            # the removed primary navbar so it remains in the page body.
            replacement = "\n" + "\n".join(
                source[item.start : item.end] for item in preserved
            ) + "\n"
            preserved_breadcrumb_count += len(preserved)
        if element.end is not None:
            replacements.append((element.start, element.end, replacement))

    for element in footer_nodes:
        if element.end is not None:
            replacements.append((element.start, element.end, ""))

    result = source
    for start, end, replacement in sorted(replacements, reverse=True):
        result = result[:start] + replacement + result[end:]
    return result, preserved_breadcrumb_count


MARKED_LINK_RE = re.compile(
    r"\s*<link\b[^>]*data-em-static-nav[^>]*>\s*", re.IGNORECASE
)
MARKED_SCRIPT_RE = re.compile(
    r"\s*<script\b[^>]*data-em-static-nav[^>]*>.*?</script>\s*",
    re.IGNORECASE | re.DOTALL,
)


def insert_shared_assets(source: str) -> str:
    newline = "\r\n" if "\r\n" in source else "\n"
    result = MARKED_LINK_RE.sub("\n", source)
    result = MARKED_SCRIPT_RE.sub("\n", result)

    head_match = re.search(r"</head\s*>", result, re.IGNORECASE)
    body_match = re.search(r"</body\s*>", result, re.IGNORECASE)
    if not head_match or not body_match:
        raise ValueError("missing </head> or </body>")

    css = newline + "    " + STATIC_CSS_TAG + newline
    result = result[: head_match.start()] + css + result[head_match.start() :]

    body_match = re.search(r"</body\s*>", result, re.IGNORECASE)
    assert body_match is not None
    script = newline + "    " + STATIC_JS_TAG + newline
    return result[: body_match.start()] + script + result[body_match.start() :]


def transform(source: str) -> tuple[str, list[str]]:
    parser = OffsetParser(source)
    parser.feed(source)
    parser.close()

    primary_nodes = primary_removal_nodes(parser)
    footer_nodes = [element for element in parser.elements if element.tag == "footer"]

    if len(footer_nodes) > 1:
        raise ValueError(f"found {len(footer_nodes)} footer elements; refusing to guess")

    result, preserved_breadcrumb_count = remove_primary_and_footers(
        source,
        primary_nodes,
        footer_nodes,
    )
    result = insert_shared_assets(result)

    if result.count("data-em-static-nav") != 2:
        raise ValueError("expected exactly one shared stylesheet and one shared script")

    changes: list[str] = []
    if primary_nodes:
        changes.append(f"remove {len(primary_nodes)} primary navbar block(s)")
    if preserved_breadcrumb_count:
        changes.append(f"preserve {preserved_breadcrumb_count} breadcrumb block(s)")
    if footer_nodes:
        changes.append("remove existing footer")
    if "data-em-static-nav" not in source:
        changes.append("add shared navbar/footer assets")
    else:
        changes.append("normalize shared asset references")
    return result, changes


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="write changes; without this flag the script only performs a dry-run",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="repository root (defaults to the parent of scripts/)",
    )
    parser.add_argument(
        "--backup-dir",
        type=Path,
        help="backup directory used with --apply (defaults to Desktop/engines-market-nav-footer-backups/<timestamp>)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    paths = [root / relative_path for relative_path in TARGET_FILES]
    missing = [path for path in paths if not path.is_file()]
    if missing:
        print("ERROR: allowlisted files are missing:")
        for path in missing:
            print(f"  {path}")
        return 2

    mode = "APPLY" if args.apply else "DRY RUN"
    print(f"{mode}: {len(paths)} allowlisted HTML files")
    planned: list[tuple[Path, str, str, list[str]]] = []
    failures = 0

    for path in paths:
        source = read_text_preserving_newlines(path)
        try:
            result, changes = transform(source)
        except (ValueError, UnicodeError) as error:
            failures += 1
            print(f"SKIP {path.relative_to(root)}: {error}")
            continue

        if result == source:
            print(f"UNCHANGED {path.relative_to(root)}")
            continue

        planned.append((path, source, result, changes))
        print(f"UPDATE {path.relative_to(root)}: {'; '.join(changes)}")

    if failures:
        print(f"\nRefusing to continue: {failures} file(s) require manual review.")
        return 3

    if not args.apply:
        print(f"\nDry-run complete. {len(planned)} file(s) would change.")
        print("Nothing was written. Re-run with --apply only after reviewing this output.")
        return 0

    backup_dir = args.backup_dir or (
        Path.home()
        / "Desktop"
        / "engines-market-nav-footer-backups"
        / datetime.now().strftime("%Y%m%d-%H%M%S")
    )
    backup_dir.mkdir(parents=True, exist_ok=False)

    for path, source, result, _changes in planned:
        backup_path = backup_dir / path.relative_to(root)
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, backup_path)
        with path.open("w", encoding="utf-8", newline="") as handle:
            handle.write(result)

    print(f"\nApplied {len(planned)} file(s). Backups: {backup_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
