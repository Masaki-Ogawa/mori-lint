# Changelog

## 1.0.0 - 2026-11-11

First stable release.

- README: live badges, demo and npm links at the top, and real example output in both languages
- Web demo published on GitHub Pages (https://masaki-ogawa.github.io/mori-lint/), sources moved to `docs/`
- No engine changes from 0.2.1

## 0.2.1 - 2026-11-11

- README merged into a single bilingual document (English first, then Japanese); package description is now bilingual

## 0.2.0 - 2026-11-11

- English report support: automatic language detection, finding messages in English (`--lang ja|en|auto`, also used by `--explain`)
- English aliases for required sections in all presets, expanded English absolute-claim dictionary
- English fixtures added (62 cases in total)

## 0.1.0 - 2026-11-10

- Initial release: seven structural rules (MORI001 to MORI007), four presets (generic, coding, research, ops), CLI with text and JSON output, suppression comments with mandatory reasons, an agent skill, and a browser demo
