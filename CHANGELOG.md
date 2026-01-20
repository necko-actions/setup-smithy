# Changelog

## [1.3.1](https://github.com/necko-actions/setup-smithy/compare/@necko-tech/setup-smithy-v1.3.0...@necko-tech/setup-smithy-v1.3.1) (2026-01-20)


### Dependencies

* **github-actions:** bump actions/checkout from 5 to 6 ([#37](https://github.com/necko-actions/setup-smithy/issues/37)) ([40905da](https://github.com/necko-actions/setup-smithy/commit/40905daf5732bb821179de0043b7e2ef26ac5061))
* **node:** bump @biomejs/biome from 2.2.3 to 2.3.11 ([#47](https://github.com/necko-actions/setup-smithy/issues/47)) ([b2167c2](https://github.com/necko-actions/setup-smithy/commit/b2167c2307f9ade4405c6490590f295de5ebab10))
* **node:** bump @tsconfig/recommended from 1.0.10 to 1.0.13 ([#38](https://github.com/necko-actions/setup-smithy/issues/38)) ([1dfdf3f](https://github.com/necko-actions/setup-smithy/commit/1dfdf3fd39bc60576dec75bfa8b14590a2253ccf))
* **node:** bump @types/node from 24.3.1 to 25.0.9 ([#45](https://github.com/necko-actions/setup-smithy/issues/45)) ([e2eb03b](https://github.com/necko-actions/setup-smithy/commit/e2eb03ba56ec69b99a14fcb7cdb43a127dc21e87))
* **node:** bump @vercel/ncc from 0.38.3 to 0.38.4 ([#32](https://github.com/necko-actions/setup-smithy/issues/32)) ([1962e53](https://github.com/necko-actions/setup-smithy/commit/1962e53ec6ba35c937e88ee578edc05c5bf72794))
* **node:** bump typescript from 5.9.2 to 5.9.3 ([#30](https://github.com/necko-actions/setup-smithy/issues/30)) ([80e3fe7](https://github.com/necko-actions/setup-smithy/commit/80e3fe77436bbf4bbc6efae0f213ca6228a0b4c5))
* **node:** update `@actions/*` dependencies ([#49](https://github.com/necko-actions/setup-smithy/issues/49)) ([d12f404](https://github.com/necko-actions/setup-smithy/commit/d12f404d09e46c5979400451c4a7c0b7ab4a60fe))
* **yarn:** update to yarn 4.12.0 ([76dd330](https://github.com/necko-actions/setup-smithy/commit/76dd3309b06a1da4c1abaf78ef80d344fd2f09e2))

## [1.3.0](https://github.com/necko-actions/setup-smithy/compare/@necko-tech/setup-smithy-v1.2.0...@necko-tech/setup-smithy-v1.3.0) (2025-09-11)


### Features

* **action:** Make Smithy CLI version optional - Default to latest ([#21](https://github.com/necko-actions/setup-smithy/issues/21)) ([42c0c4c](https://github.com/necko-actions/setup-smithy/commit/42c0c4c9305fc8cfba0d7d1b401eab83ac8ecbea))
* **action:** use node24 ([#26](https://github.com/necko-actions/setup-smithy/issues/26)) ([a1f6861](https://github.com/necko-actions/setup-smithy/commit/a1f686110c75e1eef7f8cc6ac924880fefe1d44c))


### Reverts

* **action:** disable cache ([#28](https://github.com/necko-actions/setup-smithy/issues/28)) ([0b10a11](https://github.com/necko-actions/setup-smithy/commit/0b10a11dd41e711bc81f6455daa9c308a62646f4))


### Continuous Integration

* **dependabot:** add dependabot for node, use biome action ([#22](https://github.com/necko-actions/setup-smithy/issues/22)) ([33ca271](https://github.com/necko-actions/setup-smithy/commit/33ca271d32efbb1f5816369b20b1c70a62d145ae))
* **test-setup-smithy:** add tests for version no specified ([#27](https://github.com/necko-actions/setup-smithy/issues/27)) ([632e08b](https://github.com/necko-actions/setup-smithy/commit/632e08bb9aaee0a606be8d04209b425f4a97f766))


### Dependencies

* **node:** bump yarn version 4.9.4 ([#24](https://github.com/necko-actions/setup-smithy/issues/24)) ([af9de42](https://github.com/necko-actions/setup-smithy/commit/af9de42377b71f9dad05e37a764a4ce0654e531e))
* **node:** update dependencies ([#25](https://github.com/necko-actions/setup-smithy/issues/25)) ([3999b4e](https://github.com/necko-actions/setup-smithy/commit/3999b4e69768237cfa26de4d6a2f3c8a362394b3))

## [1.2.0](https://github.com/necko-actions/setup-smithy/compare/@necko-tech/setup-smithy-v1.1.0...@necko-tech/setup-smithy-v1.2.0) (2024-04-15)


### Features

* **action:** extract zip instead of tar for version &gt;= 1.47.0 ([#16](https://github.com/necko-actions/setup-smithy/issues/16)) ([4bd82d2](https://github.com/necko-actions/setup-smithy/commit/4bd82d20a436256f42bb8368e77440b105ba10b3))

## [1.1.0](https://github.com/necko-actions/setup-smithy/compare/@necko-tech/setup-smithy-v1.0.0...@necko-tech/setup-smithy-v1.1.0) (2024-03-03)


### Features

* **action:** add SMITHY_PATH as output ([#4](https://github.com/necko-actions/setup-smithy/issues/4)) ([17feec9](https://github.com/necko-actions/setup-smithy/commit/17feec97af849393fa3da81bbcb189d7ce28f306))
* **action:** migrate to node20 ([#8](https://github.com/necko-actions/setup-smithy/issues/8)) ([5771852](https://github.com/necko-actions/setup-smithy/commit/5771852ff7d1d960e985147cc5fd1d8b50dd31da))
* initialize setup-smithy action ([2f3c513](https://github.com/necko-actions/setup-smithy/commit/2f3c5137c29a8a7bc69b076df5f80394b270469d))


### Code Refactoring

* **test-action:** rename test action ([b7881f6](https://github.com/necko-actions/setup-smithy/commit/b7881f6bacd72b37917cfea77128ba3c341fd5a8))


### Continuous Integration

* **dependabot:** add dependabot ([#10](https://github.com/necko-actions/setup-smithy/issues/10)) ([39767e9](https://github.com/necko-actions/setup-smithy/commit/39767e9981193e2c03a602551e46ce586b192d04))
* **main:** add release-please config and manifest ([#12](https://github.com/necko-actions/setup-smithy/issues/12)) ([e77de9d](https://github.com/necko-actions/setup-smithy/commit/e77de9d075ceb391d3dccbb451a696a32fe523e4))


### Dependencies

* **node:** update dependencies ([#9](https://github.com/necko-actions/setup-smithy/issues/9)) ([4ac772f](https://github.com/necko-actions/setup-smithy/commit/4ac772f37f7e7108f49ab60ede10d3edc061f0a1))
* **yarn:** migrate to yarn 4 ([#7](https://github.com/necko-actions/setup-smithy/issues/7)) ([c10c588](https://github.com/necko-actions/setup-smithy/commit/c10c5885f80f5dd92807d7edc696d9b21dada1fe))

## 1.0.0 (2023-06-28)


### Features

* initialize setup-smithy action ([2f3c513](https://github.com/necko-actions/setup-smithy/commit/2f3c5137c29a8a7bc69b076df5f80394b270469d))


### Code Refactoring

* **test-action:** rename test action ([b7881f6](https://github.com/necko-actions/setup-smithy/commit/b7881f6bacd72b37917cfea77128ba3c341fd5a8))
