import zlib from 'node:zlib'

const make = (ctx: any, handle: any) => Object.assign(ctx, {
  writable: new WritableStream({
    write: chunk => handle.write(chunk),
    close: () => handle.end()
  }),
  readable: new ReadableStream({
    type: 'bytes',
    start (ctrl) {
      handle.on('data', (chunk: ArrayBufferView) => ctrl.enqueue(chunk))
      handle.once('end', () => ctrl.close())
    }
  })
})

globalThis.CompressionStream ??= class CompressionStream {
  constructor(format: 'deflate' | 'gzip') {
    make(this, format === 'deflate' ? zlib.createDeflate() :
    format === 'gzip' ? zlib.createGzip() : zlib.createDeflateRaw())
  }
} as any

globalThis.DecompressionStream ??= class DecompressionStream {
  constructor(format: 'deflate' | 'gzip' ) {
    make(this, format === 'deflate' ? zlib.createInflate() :
    format === 'gzip' ? zlib.createGunzip() :
    zlib.createInflateRaw())
  }
} as any