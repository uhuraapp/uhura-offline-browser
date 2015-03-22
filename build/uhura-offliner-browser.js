(function() {
  var FileSystemProxy, FileTransfer;

  FileSystemProxy = (function() {
    function FileSystemProxy() {
      this.__openFS();
    }

    FileSystemProxy.prototype.resolveLocalFileSystemURL = function(path) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.__openFS().then(function() {
            return _this.fs.exists(path, function(exists) {
              if (exists) {
                return resolve();
              } else {
                return reject();
              }
            });
          });
        };
      })(this));
    };

    FileSystemProxy.prototype.__ready = function(fs) {
      this.isReady = true;
      return this.fs = fs;
    };

    FileSystemProxy.prototype.__openFS = function() {
      if (this.isReady) {
        return Promise.resolve();
      }
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return new Filer.FileSystem({
            name: "uhura_filesystem"
          }, function(err, fs) {
            if (err) {
              return reject(err);
            } else {
              return _this.__ready(fs) && resolve();
            }
          });
        };
      })(this));
    };

    return FileSystemProxy;

  })();

  FileTransfer = (function() {
    function FileTransfer() {}

    FileTransfer.prototype.download = function(url, filename, resolve, reject) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onreadystatechange = function() {};
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          debugger;
        } else {
          reject(xhr);
        }
      }
      return xhr.send();
    };

    return FileTransfer;

  })();

  window.FileTransfer = FileTransfer;

  window.FS = new FileSystemProxy;

  window.resolveLocalFileSystemURL = function(path, resolve, reject) {
    return FS.resolveLocalFileSystemURL(path).then(resolve, reject);
  };

}).call(this);
