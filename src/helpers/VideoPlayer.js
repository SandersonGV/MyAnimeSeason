export class VideoPlayer {
    constructor(options) {
      this.options = options;
      this.player = videojs(options.id, {
        controls: true,
        autoplay: options.autoplay || false,
        sources: options.sources,
      });
    }
  
    changePoster(newPoster) {
      this.player.poster(newPoster);
    }
  
    play() {
      this.player.play();
    }
  
    pause() {
      this.player.pause();
    }
  
    togglePlay() {
      this.player.paused() ? this.play() : this.pause();
    }
  
    destroy() {
      this.player.dispose();
    }
  
    changeVideo(url) {
      this.player.src(url);
    }
  
    addSubtitle(subs) {
      this.player.removeRemoteTextTrack();
      subs.forEach(element => {
        this.player.addRemoteTextTrack(element);
      });
      
    }
  }