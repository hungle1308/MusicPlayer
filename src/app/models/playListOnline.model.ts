export class PlayListOnline {
  data: Datum[];
  total: number;
  next: string;
    constructor(obj: any) {
      this.data = obj.data;
      this.total = obj.total;
      this.next = obj.next;
    }
}
export class Datum {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  artist: Artist;
  album: Album;
  type: string;
    constructor(obj: any){
      this.id = obj.id;
      this.readable = obj.readable;
      this.title = obj.title;
      this.title_short = obj.title_short;
      this.title_version = obj.title_version;
      this.link = obj.link;
      this.duration = obj.duration;
      this.rank = obj.rank;
      this.explicit_lyrics = obj.explicit_lyrics;
      this.explicit_content_lyrics = obj.explicit_content_lyrics;
      this.explicit_content_cover = obj.explicit_content_cover;
      this.preview = obj.preview;
      this.artist = obj.artist;
      this.album = obj.album;
      this.type = obj.type;
  }
}
export class Artist{
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
    constructor(obj: any) {
      this.id = obj.id;
      this.name = obj.name;
      this.link = obj.link;
      this.tracklist = obj.tracklist;
      this.type = obj.type;
  }
}
export class Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  tracklist: string;
  type: string;
    constructor(obj: any) {
      this.id = obj.id;
      this.title = obj.title;
      this.cover = obj.cover;
      this.tracklist = obj.tracklist;
      this.type = obj.type;
    }
}
