import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { AddTrack, Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'


export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
    TrackPlayer.seekTo(position);
  });
}

export const usePlayTrack = (playListData: AddTrack[]) => {
  const playBackState = usePlaybackState();
  const [isSetupDone, setSetupDone] = useState(false)
  const { duration, position } = useProgress();
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();
  const [trackArtwork, setTrackArtwork] = useState<string>();


  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    const { title, artwork, artist } = event?.track || {};
    if (event.type === Event.PlaybackActiveTrackChanged && !!event?.track) {
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  })
  useEffect(() => {
    if (!!isSetupDone && !!playListData) {
      TrackPlayer.getActiveTrack().then(async activeTrack => {
        if (activeTrack) {
          await TrackPlayer.add(playListData);
        }
      });
    }
  }, [isSetupDone, playListData])

  const onTogglePlayTrack = async () => {
    if (playBackState.state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }
  const onSeekTo = (toTime: number) => {
    TrackPlayer.seekTo(toTime);
  };
  const onSkipToNext = (initialPosition?: number) => {
    TrackPlayer.skipToNext(initialPosition);
  }
  const onSkipToPrevious = (initialPosition?: number) => {
    TrackPlayer.skipToPrevious(initialPosition);
  }
  return {
    onTogglePlayTrack,
    onSeekTo,
    onSkipToNext,
    onSkipToPrevious,
    playBackState: playBackState.state,
    duration,
    position,
    trackTitle,
    trackArtist,
    trackArtwork,
  }
}

const Bai3 = () => {
  const [isSetupDone, setSetupDone] = useState(false);


  // Khởi tạo TrackPlayer và cài đặt các options
  const startPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add([
        {
          id: '1',
          url: require('./audio/Chiucachminhnoithua.mp3'),
          title: 'Chịu cách mình nói thua',
          artist: 'Ryder',
          artwork: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/e/3/d/5/e3d541870421859d108f5f982642bd36.jpg',
        },
        {
          id: '2',
          url: require('./audio/Deanh1minh.mp3'),
          title: 'Để anh một mình',
          artist: 'Ryder',
          artwork: 'https://i1.sndcdn.com/artworks-WyRACRxXYPY9fhPv-UEiz2Q-t500x500.jpg',
        },
        {
          id: '3',
          url: require('./audio/Chungtacuatuownglai.mp3'),
          title: 'Chúng ta của tương lai',
          artist: 'Sơn Tùng M-TP',
          artwork: 'https://i.scdn.co/image/ab67616d0000b27301807cbe5b0cea6f73eda25e',
        },
      ]);
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      setSetupDone(true); // Đánh dấu là quá trình cài đặt đã hoàn thành
    } catch (error) {
      console.log('[Error player]', error);
    }
  };

  useEffect(() => {
    startPlayer();


    return () => {
      TrackPlayer.reset();
    };
  }, []);

  // Sử dụng custom hook để quản lý các chức năng phát nhạc
  const {
    onTogglePlayTrack,
    onSeekTo,
    onSkipToNext,
    onSkipToPrevious,
    playBackState,
    duration,
    position,
    trackTitle,
    trackArtist,
    trackArtwork,
  } = usePlayTrack([]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Music Player</Text>
      {trackArtwork && <Image source={{ uri: trackArtwork }} style={{ width: 200, height: 200 }} />}
      <Text>{trackTitle}</Text>
      <Text>{trackArtist}</Text>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <Button title="Previous" onPress={() => onSkipToPrevious(position)} />
        <Button title={playBackState === State.Playing ? 'Pause' : 'Play'} onPress={onTogglePlayTrack} />
        <Button title="Next" onPress={() => onSkipToNext(position)} />
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <Button title="Seek -10s" onPress={() => onSeekTo(Math.max(0, position - 10))} />
        <Button title="Seek +10s" onPress={() => onSeekTo(Math.min(duration, position + 10))} />
      </View>
      <Text>{position.toFixed(0)}s / {duration.toFixed(0)}s</Text>
    </View>
  );
};

export default Bai3

const styles = StyleSheet.create({})