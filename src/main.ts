import createK from './createK';
import { menuScene } from './menuScene';
import waitingScene from './waitingScene';
import joinScene from './joinScene';
import { Server } from './server';
import { alertMessage } from './alertMessage';
import { worldScene } from './worldScene';
import { offlineScene } from './offlineScene';
import { AssetsData } from './assetsData';

export default function main() {
  const k = createK();
  AssetsData({ k });
  const server = new Server(k, (message: string) => {
    alertMessage({
      k,
      message,
      duration: 3,
      callback: () => k.go("join")
    });
  });
  menuScene({ k });
  worldScene({ k, server });
  waitingScene({ k, server });
  joinScene({ k, server });
  offlineScene({ k });

  k.go("offline");
}
