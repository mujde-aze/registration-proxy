# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2022-01-12

### Changed
- Updated a bunch of dependencies

## [1.3.1] - 2021-11-22

### Removed
- Property to set nt_status when creating a new contact. May need to be re-implemented in a more targeted fashion.

## [1.3.0] - 2021-11-17

### Changed
- Uncommented logic to create contacts in DT

## [1.2.0] - 2021-10-31

### Changed
- Prepend country code to phone number

## [1.1.2] - 2021-10-15

### Removed
- Street number from incoming address

## [1.1.1] - 2021-10-14

### Changed
- Updated eslint dependencies

### Fixed
- Bug where axios POST return type was forcing the same input type

## [1.1.0] - 2021-09-21

## Added
- Contact model now includes phone number.

## Changed
- Updated required fields to align with UI.

## [1.0.3] - 2021-09-11

### Changed
- Process captcha token as received from UI. AppCheck cannot help with this as the moment.

## [1.0.2] - 2021-09-10

### Changed
- Commented out mutation logic until frontend is ready.
- Updated registration request names to match client.

## [1.0.0] - 2021-09-07

### Added
- Initial release.

[1.4.0]: https://github.com/mujde-aze/registration-proxy/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/mujde-aze/registration-proxy/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/mujde-aze/registration-proxy/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/mujde-aze/registration-proxy/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/mujde-aze/registration-proxy/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/mujde-aze/registration-proxy/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/mujde-aze/registration-proxy/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/mujde-aze/registration-proxy/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/mujde-aze/registration-proxy/compare/v1.0.0...v1.0.2
[1.0.0]: https://github.com/mujde-aze/registration-proxy/compare/v1.0.0...HEAD
