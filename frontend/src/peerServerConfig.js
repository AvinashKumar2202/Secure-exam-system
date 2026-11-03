const getPeerServerConfig = () => {
    const apiUrl = process.env.REACT_APP_API_URL || window.location.origin;
    const peerServerUrl = new URL(apiUrl, window.location.origin);

    return {
        host: peerServerUrl.hostname,
        port: peerServerUrl.port || (peerServerUrl.protocol === 'https:' ? 443 : 80),
        path: '/peerjs',
        secure: peerServerUrl.protocol === 'https:',
    };
};

export default getPeerServerConfig;
