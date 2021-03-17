function parsePoolMessage(poolError) {
    return poolError ? poolError.toString() : 'success';
}

module.exports = parsePoolMessage;