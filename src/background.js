/*
https://github.com/jershell/simple-jsonrpc-js

aria2c \
    --disable-ipv6=true \
    --enable-rpc \
    --rpc-allow-origin-all \
    --rpc-listen-port=6800 \
    -d /Users/$USER/Downloads \
    --rpc-secret=112233445566


https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler


 */

function handleChanged(delta) {
  if (delta.state && delta.state.current === 'complete') {
    console.log(`Download ${delta.id} has completed.`);

    chrome.downloads.search({ id: delta.id }, (items) => {
      const [target] = items;
      const {
        filename,
        mime,
      } = target;
      if (!mime.includes('application/x-bittorrent')
        && !filename.endsWith('.torrent')) {
        // not torrent file
        return;
      }

      console.log(target)
      console.log('the torrent file:', target.filename)
    })
  }
}

chrome.downloads.onChanged.addListener(handleChanged);
