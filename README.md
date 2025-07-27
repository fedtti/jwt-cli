![JSON Web Token (JWT)](./thumbnail.png)

# jwt-cli

Inspired by Auth0’s **[JWT Debugger](https://jwt.io/)** using `jsonwebtoken` for Node.js

- [Install](#install)
- [Usage](#usage)
  - [Encoder](#encoder)
    - [Example](#example)
    - [Result](#result)
  - [Decoder](#decoder)
    - [Example](#example-1)
    - [Result](#result-1)
- [Contributing](#contributing)
- [License](#license)

## Install

## Usage

If you want to use the interactive mode, you can just type:

```bash
jwt-cli
```

…and follow the prompts.

Otherwise, you can skip it by adding a command and its argument(s) and/or option(s).
You can see the full list of commands, arguments, and options by appending either `-h` or `--help`. 

Below, both an encoding example and a decoding example along with their results.

### Encoder

#### Example

#### Result

### Decoder

#### Example

```bash
jwt-cli decode --token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30 --secret a-string-secret-at-least-256-bits-long
```

#### Result

```bash
{"sub":"1234567890","name":"John Doe","admin":true,"iat":1516239022}
```

## Contributing

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more info.
