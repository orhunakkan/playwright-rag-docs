# QUIC

> **Source:** [nodejs.org/docs/v24.18.0/api/quic.html](https://nodejs.org/docs/v24.18.0/api/quic.html)

---

**Introduced in:** v23.8.0


**Added in:** v23.8.0


> Stability: 1.0 - Early development


The 'node:quic' module provides an implementation of the QUIC protocol.
To access it, start Node.js with the `--experimental-quic` option and:

```mjs
import quic from 'node:quic';
```

```cjs
const quic = require('node:quic');
```

The module is only available under the `node:` scheme.

## `quic.connect(address[, options])`

**Added in:** v23.8.0


* `address` {string|net.SocketAddress}
* `options` {quic.SessionOptions}
* Returns: {Promise} a promise for a {quic.QuicSession}

Initiate a new client-side session.

```mjs
import { connect } from 'node:quic';
import { Buffer } from 'node:buffer';

const enc = new TextEncoder();
const alpn = 'foo';
const client = await connect('123.123.123.123:8888', { alpn });
await client.createUnidirectionalStream({
  body: enc.encode('hello world'),
});
```

By default, every call to `connect(...)` will create a new local
`QuicEndpoint` instance bound to a new random local IP port. To
specify the exact local address to use, or to multiplex multiple
QUIC sessions over a single local port, pass the `endpoint` option
with either a `QuicEndpoint` or `EndpointOptions` as the argument.

```mjs
import { QuicEndpoint, connect } from 'node:quic';

const endpoint = new QuicEndpoint({
  address: '127.0.0.1:1234',
});

const client = await connect('123.123.123.123:8888', { endpoint });
```

## `quic.listen(onsession,[options])`

**Added in:** v23.8.0


* `onsession` {quic.OnSessionCallback}
* `options` {quic.SessionOptions}
* Returns: {Promise} a promise for a {quic.QuicEndpoint}

Configures the endpoint to listen as a server. When a new session is initiated by
a remote peer, the given `onsession` callback will be invoked with the created
session.

```mjs
import { listen } from 'node:quic';

const endpoint = await listen((session) => {
  // ... handle the session
});

// Closing the endpoint allows any sessions open when close is called
// to complete naturally while preventing new sessions from being
// initiated. Once all existing sessions have finished, the endpoint
// will be destroyed. The call returns a promise that is resolved once
// the endpoint is destroyed.
await endpoint.close();
```

By default, every call to `listen(...)` will create a new local
`QuicEndpoint` instance bound to a new random local IP port. To
specify the exact local address to use, or to multiplex multiple
QUIC sessions over a single local port, pass the `endpoint` option
with either a `QuicEndpoint` or `EndpointOptions` as the argument.

At most, any single `QuicEndpoint` can only be configured to listen as
a server once.

## Class: `QuicEndpoint`

A `QuicEndpoint` encapsulates the local UDP-port binding for QUIC. It can be
used as both a client and a server.

### `new QuicEndpoint([options])`

**Added in:** v23.8.0


* `options` {quic.EndpointOptions}

### `endpoint.address`

**Added in:** v23.8.0


* Type: {net.SocketAddress|undefined}

The local UDP socket address to which the endpoint is bound, if any.

If the endpoint is not currently bound then the value will be `undefined`. Read only.

### `endpoint.busy`

**Added in:** v23.8.0


* Type: {boolean}

When `endpoint.busy` is set to true, the endpoint will temporarily reject
new sessions from being created. Read/write.

```mjs
// Mark the endpoint busy. New sessions will be prevented.
endpoint.busy = true;

// Mark the endpoint free. New session will be allowed.
endpoint.busy = false;
```

The `busy` property is useful when the endpoint is under heavy load and needs to
temporarily reject new sessions while it catches up.

### `endpoint.close()`

**Added in:** v23.8.0


* Returns: {Promise}

Gracefully close the endpoint. The endpoint will close and destroy itself when
all currently open sessions close. Once called, new sessions will be rejected.

Returns a promise that is fulfilled when the endpoint is destroyed.

### `endpoint.closed`

**Added in:** v23.8.0


* Type: {Promise}

A promise that is fulfilled when the endpoint is destroyed. This will be the same promise that is
returned by the `endpoint.close()` function. Read only.

### `endpoint.closing`

**Added in:** v23.8.0


* Type: {boolean}

True if `endpoint.close()` has been called and closing the endpoint has not yet completed.
Read only.

### `endpoint.destroy([error])`

**Added in:** v23.8.0


* `error` {any}

Forcefully closes the endpoint by forcing all open sessions to be immediately
closed.

### `endpoint.destroyed`

**Added in:** v23.8.0


* Type: {boolean}

True if `endpoint.destroy()` has been called. Read only.

### `endpoint.listening`

* Type: {boolean}

True if the endpoint is actively listening for incoming connections. Read only.

### `endpoint.setSNIContexts(entries[, options])`

**Added in:** v24.16.0


* `entries` {object} An object mapping host names to TLS identity options.
  Each entry must include `keys` and `certs`.
* `options` {object}
  * `replace` {boolean} If `true`, replaces the entire SNI map. If `false`
    (the default), merges the entries into the existing map.

Replaces or updates the SNI TLS contexts for this endpoint. This allows
changing the TLS identity (key/certificate) used for specific host names
without restarting the endpoint. Existing sessions are unaffected — only
new sessions will use the updated contexts.

```mjs
endpoint.setSNIContexts({
  'api.example.com': { keys: [newApiKey], certs: [newApiCert] },
});

// Replace the entire SNI map
endpoint.setSNIContexts({
  'api.example.com': { keys: [newApiKey], certs: [newApiCert] },
}, { replace: true });
```

### `endpoint.stats`

**Added in:** v23.8.0


* Type: {quic.QuicEndpoint.Stats}

The statistics collected for an active session. Read only.

### `endpoint[Symbol.asyncDispose]()`

**Added in:** v23.8.0


Calls `endpoint.close()` and returns a promise that fulfills when the
endpoint has closed.

## Class: `QuicEndpoint.Stats`

**Added in:** v23.8.0


A view of the collected statistics for an endpoint.

### `endpointStats.createdAt`

**Added in:** v23.8.0


* Type: {bigint} A timestamp indicating the moment the endpoint was created. Read only.

### `endpointStats.destroyedAt`

**Added in:** v23.8.0


* Type: {bigint} A timestamp indicating the moment the endpoint was destroyed. Read only.

### `endpointStats.bytesReceived`

**Added in:** v23.8.0


* Type: {bigint} The total number of bytes received by this endpoint. Read only.

### `endpointStats.bytesSent`

**Added in:** v23.8.0


* Type: {bigint} The total number of bytes sent by this endpoint. Read only.

### `endpointStats.packetsReceived`

**Added in:** v23.8.0


* Type: {bigint} The total number of QUIC packets successfully received by this endpoint. Read only.

### `endpointStats.packetsSent`

**Added in:** v23.8.0


* Type: {bigint} The total number of QUIC packets successfully sent by this endpoint. Read only.

### `endpointStats.serverSessions`

**Added in:** v23.8.0


* Type: {bigint} The total number of peer-initiated sessions received by this endpoint. Read only.

### `endpointStats.clientSessions`

**Added in:** v23.8.0


* Type: {bigint} The total number of sessions initiated by this endpoint. Read only.

### `endpointStats.serverBusyCount`

**Added in:** v23.8.0


* Type: {bigint} The total number of times an initial packet was rejected due to the
  endpoint being marked busy. Read only.

### `endpointStats.retryCount`

**Added in:** v23.8.0


* Type: {bigint} The total number of QUIC retry attempts on this endpoint. Read only.

### `endpointStats.versionNegotiationCount`

**Added in:** v23.8.0


* Type: {bigint} The total number sessions rejected due to QUIC version mismatch. Read only.

### `endpointStats.statelessResetCount`

**Added in:** v23.8.0


* Type: {bigint} The total number of stateless resets handled by this endpoint. Read only.

### `endpointStats.immediateCloseCount`

**Added in:** v23.8.0


* Type: {bigint} The total number of sessions that were closed before handshake completed. Read only.

## Class: `QuicSession`

**Added in:** v23.8.0


A `QuicSession` represents the local side of a QUIC connection.

### `session.close()`

**Added in:** v23.8.0


* Returns: {Promise}

Initiate a graceful close of the session. Existing streams will be allowed
to complete but no new streams will be opened. Once all streams have closed,
the session will be destroyed. The returned promise will be fulfilled once
the session has been destroyed.

### `session.closed`

**Added in:** v23.8.0


* Type: {Promise}

A promise that is fulfilled once the session is destroyed.

### `session.destroy([error])`

**Added in:** v23.8.0


* `error` {any}

Immediately destroy the session. All streams will be destroys and the
session will be closed.

### `session.destroyed`

**Added in:** v23.8.0


* Type: {boolean}

True if `session.destroy()` has been called. Read only.

### `session.endpoint`

**Added in:** v23.8.0


* Type: {quic.QuicEndpoint}

The endpoint that created this session. Read only.

### `session.onstream`

**Added in:** v23.8.0


* Type: {quic.OnStreamCallback}

The callback to invoke when a new stream is initiated by a remote peer. Read/write.

### `session.ondatagram`

**Added in:** v23.8.0


* Type: {quic.OnDatagramCallback}

The callback to invoke when a new datagram is received from a remote peer. Read/write.

### `session.ondatagramstatus`

**Added in:** v23.8.0


* Type: {quic.OnDatagramStatusCallback}

The callback to invoke when the status of a datagram is updated. Read/write.

### `session.onpathvalidation`

**Added in:** v23.8.0


* Type: {quic.OnPathValidationCallback}

The callback to invoke when the path validation is updated. Read/write.

### `session.onsessionticket`

**Added in:** v23.8.0


* Type: {quic.OnSessionTicketCallback}

The callback to invoke when a new session ticket is received. Read/write.

### `session.onversionnegotiation`

**Added in:** v23.8.0


* Type: {quic.OnVersionNegotiationCallback}

The callback to invoke when a version negotiation is initiated. Read/write.

### `session.onhandshake`

**Added in:** v23.8.0


* Type: {quic.OnHandshakeCallback}

The callback to invoke when the TLS handshake is completed. Read/write.

### `session.createBidirectionalStream([options])`

**Added in:** v23.8.0


* `options` {Object}
  * `body` {ArrayBuffer | ArrayBufferView | Blob}
  * `sendOrder` {number}
* Returns: {Promise} for a {quic.QuicStream}

Open a new bidirectional stream. If the `body` option is not specified,
the outgoing stream will be half-closed.

### `session.createUnidirectionalStream([options])`

**Added in:** v23.8.0


* `options` {Object}
  * `body` {ArrayBuffer | ArrayBufferView | Blob}
  * `sendOrder` {number}
* Returns: {Promise} for a {quic.QuicStream}

Open a new unidirectional stream. If the `body` option is not specified,
the outgoing stream will be closed.

### `session.path`

**Added in:** v23.8.0


* Type: {Object|undefined}
  * `local` {net.SocketAddress}
  * `remote` {net.SocketAddress}

The local and remote socket addresses associated with the session. Read only.

### `session.sendDatagram(datagram)`

**Added in:** v23.8.0


* `datagram` {string|ArrayBufferView}
* Returns: {bigint}

Sends an unreliable datagram to the remote peer, returning the datagram ID.
If the datagram payload is specified as an `ArrayBufferView`, then ownership of
that view will be transferred to the underlying stream.

### `session.stats`

**Added in:** v23.8.0


* Type: {quic.QuicSession.Stats}

Return the current statistics for the session. Read only.

### `session.updateKey()`

**Added in:** v23.8.0


Initiate a key update for the session.

### `session[Symbol.asyncDispose]()`

**Added in:** v23.8.0


Calls `session.close()` and returns a promise that fulfills when the
session has closed.

## Class: `QuicSession.Stats`

**Added in:** v23.8.0


### `sessionStats.createdAt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.closingAt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.handshakeCompletedAt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.handshakeConfirmedAt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.bytesReceived`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.bytesSent`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.bidiInStreamCount`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.bidiOutStreamCount`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.uniInStreamCount`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.uniOutStreamCount`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.maxBytesInFlights`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.bytesInFlight`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.blockCount`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.cwnd`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.latestRtt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.minRtt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.rttVar`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.smoothedRtt`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.ssthresh`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.datagramsReceived`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.datagramsSent`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.datagramsAcknowledged`

**Added in:** v23.8.0


* Type: {bigint}

### `sessionStats.datagramsLost`

**Added in:** v23.8.0


* Type: {bigint}

## Class: `QuicStream`

**Added in:** v23.8.0


### `stream.closed`

**Added in:** v23.8.0


* Type: {Promise}

A promise that is fulfilled when the stream is fully closed.

### `stream.destroy([error])`

**Added in:** v23.8.0


* `error` {any}

Immediately and abruptly destroys the stream.

### `stream.destroyed`

**Added in:** v23.8.0


* Type: {boolean}

True if `stream.destroy()` has been called.

### `stream.direction`

**Added in:** v23.8.0


* Type: {string} One of either `'bidi'` or `'uni'`.

The directionality of the stream. Read only.

### `stream.id`

**Added in:** v23.8.0


* Type: {bigint}

The stream ID. Read only.

### `stream.onblocked`

**Added in:** v23.8.0


* Type: {quic.OnBlockedCallback}

The callback to invoke when the stream is blocked. Read/write.

### `stream.onreset`

**Added in:** v23.8.0


* Type: {quic.OnStreamErrorCallback}

The callback to invoke when the stream is reset. Read/write.

### `stream.readable`

**Added in:** v23.8.0


* Type: {ReadableStream}

### `stream.session`

**Added in:** v23.8.0


* Type: {quic.QuicSession}

The session that created this stream. Read only.

### `stream.stats`

**Added in:** v23.8.0


* Type: {quic.QuicStream.Stats}

The current statistics for the stream. Read only.

## Class: `QuicStream.Stats`

**Added in:** v23.8.0


### `streamStats.ackedAt`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.bytesReceived`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.bytesSent`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.createdAt`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.destroyedAt`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.finalSize`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.isConnected`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.maxOffset`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.maxOffsetAcknowledged`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.maxOffsetReceived`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.openedAt`

**Added in:** v23.8.0


* Type: {bigint}

### `streamStats.receivedAt`

**Added in:** v23.8.0


* Type: {bigint}

## Types

### Type: `EndpointOptions`

**Added in:** v23.8.0


* Type: {Object}

The endpoint configuration options passed when constructing a new `QuicEndpoint` instance.

#### `endpointOptions.address`

**Added in:** v23.8.0


* Type: {net.SocketAddress | string} The local UDP address and port the endpoint should bind to.

If not specified the endpoint will bind to IPv4 `localhost` on a random port.

#### `endpointOptions.addressLRUSize`

**Added in:** v23.8.0


* Type: {bigint|number}

The endpoint maintains an internal cache of validated socket addresses as a
performance optimization. This option sets the maximum number of addresses
that are cache. This is an advanced option that users typically won't have
need to specify.

#### `endpointOptions.ipv6Only`

**Added in:** v23.8.0


* Type: {boolean}

When `true`, indicates that the endpoint should bind only to IPv6 addresses.

#### `endpointOptions.reusePort`

**Added in:** v24.18.0


* Type: {boolean}
* Default: `false`

When `true`, allows multiple endpoints (across separate processes) to bind to
the same address and port. The kernel will load-balance incoming UDP datagrams
across all sockets bound with this option. This enables horizontal scaling of
QUIC servers by running multiple Node.js processes on the same port.

Supported on Linux 3.9+ and DragonFlyBSD 3.6+. On unsupported platforms, the
bind will fail with an error.

#### `endpointOptions.maxConnectionsPerHost`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum number of concurrent sessions allowed per remote peer address.

#### `endpointOptions.maxConnectionsTotal`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum total number of concurrent sessions.

#### `endpointOptions.maxRetries`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum number of QUIC retry attempts allowed per remote peer address.

#### `endpointOptions.maxStatelessResetsPerHost`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum number of stateless resets that are allowed per remote peer address.

#### `endpointOptions.retryTokenExpiration`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the length of time a QUIC retry token is considered valid.

#### `endpointOptions.resetTokenSecret`

**Added in:** v23.8.0


* Type: {ArrayBufferView}

Specifies the 16-byte secret used to generate QUIC retry tokens.

#### `endpointOptions.tokenExpiration`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the length of time a QUIC token is considered valid.

#### `endpointOptions.tokenSecret`

**Added in:** v23.8.0


* Type: {ArrayBufferView}

Specifies the 16-byte secret used to generate QUIC tokens.

#### `endpointOptions.udpReceiveBufferSize`

**Added in:** v23.8.0


* Type: {number}

#### `endpointOptions.udpSendBufferSize`

**Added in:** v23.8.0


* Type: {number}

#### `endpointOptions.udpTTL`

**Added in:** v23.8.0


* Type: {number}

#### `endpointOptions.validateAddress`

**Added in:** v23.8.0


* Type: {boolean}

When `true`, requires that the endpoint validate peer addresses using retry packets
while establishing a new connection.

### Type: `SessionOptions`

**Added in:** v23.8.0


#### `sessionOptions.alpn`

**Added in:** v24.16.0


* Type: {string} (client) | {string\[]} (server)

The ALPN (Application-Layer Protocol Negotiation) identifier(s).

For **client** sessions, this is a single string specifying the protocol
the client wants to use (e.g. `'h3'`).

For **server** sessions, this is an array of protocol names in preference
order that the server supports (e.g. `['h3', 'h3-29']`). During the TLS
handshake, the server selects the first protocol from its list that the
client also supports.

The negotiated ALPN determines which Application implementation is used
for the session. `'h3'` and `'h3-*'` variants select the HTTP/3
application; all other values select the default application.

Default: `'h3'`

#### `sessionOptions.ca` (client only)

**Added in:** v23.8.0


* Type: {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

The CA certificates to use for client sessions. For server sessions, CA
certificates are specified per-identity in the [`sessionOptions.sni`][] map.

#### `sessionOptions.cc`

**Added in:** v23.8.0


* Type: {string}

Specifies the congestion control algorithm that will be used
. Must be set to one of either `'reno'`, `'cubic'`, or `'bbr'`.

This is an advanced option that users typically won't have need to specify.

#### `sessionOptions.certs` (client only)

**Added in:** v23.8.0


* Type: {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

The TLS certificates to use for client sessions. For server sessions,
certificates are specified per-identity in the [`sessionOptions.sni`][] map.

#### `sessionOptions.ciphers`

**Added in:** v23.8.0


* Type: {string}

The list of supported TLS 1.3 cipher algorithms.

#### `sessionOptions.crl` (client only)

**Added in:** v23.8.0


* Type: {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}

The CRL to use for client sessions. For server sessions, CRLs are specified
per-identity in the [`sessionOptions.sni`][] map.

#### `sessionOptions.groups`

**Added in:** v23.8.0


* Type: {string}

The list of support TLS 1.3 cipher groups.

#### `sessionOptions.keylog`

**Added in:** v23.8.0


* Type: {boolean}

True to enable TLS keylogging output.

#### `sessionOptions.keys` (client only)

**Added in:** v23.8.0
**History:**
- v24.15.0: CryptoKey is no longer accepted.


* Type: {KeyObject|KeyObject\[]}

The TLS crypto keys to use for client sessions. For server sessions,
keys are specified per-identity in the [`sessionOptions.sni`][] map.

#### `sessionOptions.maxPayloadSize`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum UDP packet payload size.

#### `sessionOptions.maxStreamWindow`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum stream flow-control window size.

#### `sessionOptions.maxWindow`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum session flow-control window size.

#### `sessionOptions.minVersion`

**Added in:** v23.8.0


* Type: {number}

The minimum QUIC version number to allow. This is an advanced option that users
typically won't have need to specify.

#### `sessionOptions.preferredAddressPolicy`

**Added in:** v23.8.0


* Type: {string} One of `'use'`, `'ignore'`, or `'default'`.

When the remote peer advertises a preferred address, this option specifies whether
to use it or ignore it.

#### `sessionOptions.qlog`

**Added in:** v23.8.0


* Type: {boolean}

True if qlog output should be enabled.

#### `sessionOptions.sessionTicket`

**Added in:** v23.8.0


* Type: {ArrayBufferView} A session ticket to use for 0RTT session resumption.

#### `sessionOptions.handshakeTimeout`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum number of milliseconds a TLS handshake is permitted to take
to complete before timing out.

#### `sessionOptions.servername` (client only)

**Added in:** v23.8.0


* Type: {string}

The peer server name to target (SNI). Defaults to `'localhost'`.

#### `sessionOptions.sni` (server only)

**Added in:** v24.16.0


* Type: {Object}

An object mapping host names to TLS identity options for Server Name
Indication (SNI) support. This is required for server sessions. The
special key `'*'` specifies the default/fallback identity used when
no other host name matches. Each entry may contain:

* `keys` {KeyObject|KeyObject\[]} The TLS private keys. **Required.**
* `certs` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  The TLS certificates. **Required.**
* `ca` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  Optional CA certificate overrides.
* `crl` {ArrayBuffer|ArrayBufferView|ArrayBuffer\[]|ArrayBufferView\[]}
  Optional certificate revocation lists.
* `verifyPrivateKey` {boolean} Verify the private key. Default: `false`.

```mjs
const endpoint = await listen(callback, {
  sni: {
    '*': { keys: [defaultKey], certs: [defaultCert] },
    'api.example.com': { keys: [apiKey], certs: [apiCert] },
    'www.example.com': { keys: [wwwKey], certs: [wwwCert], ca: [customCA] },
  },
});
```

Shared TLS options (such as `ciphers`, `groups`, `keylog`, and `verifyClient`)
are specified at the top level of the session options and apply to all
identities. Each SNI entry overrides only the per-identity certificate
fields.

The SNI map can be replaced at runtime using `endpoint.setSNIContexts()`,
which atomically swaps the map for new sessions while existing sessions
continue to use their original identity.

#### `sessionOptions.tlsTrace`

**Added in:** v23.8.0


* Type: {boolean}

True to enable TLS tracing output.

#### `sessionOptions.transportParams`

**Added in:** v23.8.0


* Type: {quic.TransportParams}

The QUIC transport parameters to use for the session.

#### `sessionOptions.unacknowledgedPacketThreshold`

**Added in:** v23.8.0


* Type: {bigint|number}

Specifies the maximum number of unacknowledged packets a session should allow.

#### `sessionOptions.verifyClient`

**Added in:** v23.8.0


* Type: {boolean}

True to require verification of TLS client certificate.

#### `sessionOptions.verifyPrivateKey` (client only)

**Added in:** v23.8.0


* Type: {boolean}

True to require private key verification for client sessions. For server
sessions, this option is specified per-identity in the
[`sessionOptions.sni`][] map.

#### `sessionOptions.version`

**Added in:** v23.8.0


* Type: {number}

The QUIC version number to use. This is an advanced option that users typically
won't have need to specify.

### Type: `TransportParams`

**Added in:** v23.8.0


#### `transportParams.preferredAddressIpv4`

**Added in:** v23.8.0


* Type: {net.SocketAddress} The preferred IPv4 address to advertise.

#### `transportParams.preferredAddressIpv6`

**Added in:** v23.8.0


* Type: {net.SocketAddress} The preferred IPv6 address to advertise.

#### `transportParams.initialMaxStreamDataBidiLocal`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.initialMaxStreamDataBidiRemote`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.initialMaxStreamDataUni`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.initialMaxData`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.initialMaxStreamsBidi`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.initialMaxStreamsUni`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.maxIdleTimeout`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.activeConnectionIDLimit`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.ackDelayExponent`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.maxAckDelay`

**Added in:** v23.8.0


* Type: {bigint|number}

#### `transportParams.maxDatagramFrameSize`

**Added in:** v23.8.0


* Type: {bigint|number}

## Callbacks

### Callback: `OnSessionCallback`

**Added in:** v23.8.0


* `this` {quic.QuicEndpoint}
* `session` {quic.QuicSession}

The callback function that is invoked when a new session is initiated by a remote peer.

### Callback: `OnStreamCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `stream` {quic.QuicStream}

### Callback: `OnDatagramCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `datagram` {Uint8Array}
* `early` {boolean}

### Callback: `OnDatagramStatusCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `id` {bigint}
* `status` {string} One of either `'lost'` or `'acknowledged'`.

### Callback: `OnPathValidationCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `result` {string} One of either `'success'`, `'failure'`, or `'aborted'`.
* `newLocalAddress` {net.SocketAddress}
* `newRemoteAddress` {net.SocketAddress}
* `oldLocalAddress` {net.SocketAddress}
* `oldRemoteAddress` {net.SocketAddress}
* `preferredAddress` {boolean}

### Callback: `OnSessionTicketCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `ticket` {Object}

### Callback: `OnVersionNegotiationCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `version` {number}
* `requestedVersions` {number\[]}
* `supportedVersions` {number\[]}

### Callback: `OnHandshakeCallback`

**Added in:** v23.8.0


* `this` {quic.QuicSession}
* `sni` {string}
* `alpn` {string}
* `cipher` {string}
* `cipherVersion` {string}
* `validationErrorReason` {string}
* `validationErrorCode` {number}
* `earlyDataAccepted` {boolean}

### Callback: `OnBlockedCallback`

**Added in:** v23.8.0


* `this` {quic.QuicStream}

### Callback: `OnStreamErrorCallback`

**Added in:** v23.8.0


* `this` {quic.QuicStream}
* `error` {any}

## Diagnostic Channels

### Channel: `quic.endpoint.created`

**Added in:** v23.8.0


* `endpoint` {quic.QuicEndpoint}
* `config` {quic.EndpointOptions}

### Channel: `quic.endpoint.listen`

**Added in:** v23.8.0


* `endpoint` {quic.QuicEndpoint}
* `optoins` {quic.SessionOptions}

### Channel: `quic.endpoint.closing`

**Added in:** v23.8.0


* `endpoint` {quic.QuicEndpoint}
* `hasPendingError` {boolean}

### Channel: `quic.endpoint.closed`

**Added in:** v23.8.0


* `endpoint` {quic.QuicEndpoint}

### Channel: `quic.endpoint.error`

**Added in:** v23.8.0


* `endpoint` {quic.QuicEndpoint}
* `error` {any}

### Channel: `quic.endpoint.busy.change`

**Added in:** v23.8.0


* `endpoint` {quic.QuicEndpoint}
* `busy` {boolean}

### Channel: `quic.session.created.client`

**Added in:** v23.8.0


### Channel: `quic.session.created.server`

**Added in:** v23.8.0


### Channel: `quic.session.open.stream`

**Added in:** v23.8.0


### Channel: `quic.session.received.stream`

**Added in:** v23.8.0


### Channel: `quic.session.send.datagram`

**Added in:** v23.8.0


### Channel: `quic.session.update.key`

**Added in:** v23.8.0


### Channel: `quic.session.closing`

**Added in:** v23.8.0


### Channel: `quic.session.closed`

**Added in:** v23.8.0


### Channel: `quic.session.receive.datagram`

**Added in:** v23.8.0


### Channel: `quic.session.receive.datagram.status`

**Added in:** v23.8.0


### Channel: `quic.session.path.validation`

**Added in:** v23.8.0


### Channel: `quic.session.ticket`

**Added in:** v23.8.0


### Channel: `quic.session.version.negotiation`

**Added in:** v23.8.0


### Channel: `quic.session.handshake`

**Added in:** v23.8.0


[`sessionOptions.sni`]: #sessionoptionssni-server-only
