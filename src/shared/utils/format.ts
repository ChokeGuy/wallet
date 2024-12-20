const encode = (data: string) => new TextEncoder().encode(data);

const decode = (data: Uint8Array<ArrayBufferLike>) =>
    new TextDecoder().decode(data);

export { decode, encode };
