# Setup Smithy CLI for GitHub Actions

This action provide the following functionality for GitHub Actions users:

* Installing a version of Smithy CLI and adding it to the PATH
* Optionally caching the content of maven dependencies (located at `~/.m2/software/amazon/smithy`) specified in a `smithy-build.json`

## Basic usage

See [action.yml](action.yml)

Running smithy CLI :

```yaml
steps:
  - uses: actions/checkout@v5
  - uses: necko-actions/setup-smithy@v1
    with:
      version: "1.47.0"
  - run: smithy --version
```

Cache dependencies :

```yaml
steps:
  - uses: actions/checkout@v5
  - uses: necko-actions/setup-smithy@v1
    with:
      version: "1.47.0"
      smithy-build: "samples/smithy-build.json"
  - run: smithy build
    working-directory: samples
```

You can see the example running [.github/workflows/test-setup-smithy.yml](.github/workflows/test-setup-smithy.yml).

## Supported architecture

All architecture released by the [Smithy CLI](https://github.com/awslabs/smithy/releases) are supported.
