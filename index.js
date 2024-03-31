 /**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './Bai3';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(()=> playbackService);