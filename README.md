![Alt text](/storage/digizign-logo.png?raw=true "DigiZign")


### Features ###

* Social Media - display posts from Twitter on hashtag searches
* Slides - Show predefined slideshows, upload a PDF and the application automagically splits it into slides
* Announcements - use the backend interface to display announcement across all clients
* YouTube LiveStream - display youtube livestreams on clients
* Client Control - control your clients via the backend API e.g. reload all clients and so on
* Socket.io implementation means that client autoconnect if connection to server is lost
* Built with NodeJS, TypeScript, Express and Socket.io

### Getting Started ###

* Clone the repo
* Run `npm install`
* Build the application using gulp (`gulp build`)
* Setup your config files
* Run the app

### Prebuilt Raspberry Pi Images ###
Big thanks to the guys at TOLDO TECHNIK who provided the project with prebuilt RPI images from their awesome version of buildroot-wpe
The WPE project allows the raspberry pi to run in "kiosk" mode with full hardware acceleration (think 60 fps webgl content ... insane) and the guys over at TOLDO TECHNIK made an even sweeter version with a whole host of features - check out their project at: https://github.com/TOLDOTECHNIK/buildroot-webkit

LINKS TO DIGIZIGN WPE IMAGES:
* Coming real real soon!

### Roadmap ### 
- [X] YouTube LiveStream
- [ ] New Instagram/Facebook Graph API Integration
- [ ] Additional admin tools for Slideshow control
- [ ] Additional Streaming Services
- [ ] Shared/Individual Client State Control
- [ ] Named Clients

### Known Bugs ###
* When setting up a youtube livestream, clients will begin to refresh the page indefinitely unless a "reload all clients" command is sent from the admin page

### Contributing ###

* Clone the repo
* Make your changes
* Submit a PR

### Who do I talk to? ###

* to me! ;) i'll do what i can to help!
