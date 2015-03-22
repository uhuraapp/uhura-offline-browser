class FileSystemProxy
  constructor: -> @__openFS()
  resolveLocalFileSystemURL: (path)->
    new Promise (resolve, reject)=>
      @__openFS().then =>
        @fs.exists path, (exists) -> if exists then resolve() else reject()

  __ready: (fs)->
    @isReady = true
    @fs = fs

  __openFS: ->
    return Promise.resolve() if @isReady

    new Promise (resolve, reject)=>
      new Filer.FileSystem name: "uhura_filesystem",
        (err, fs)=> if err then reject(err) else @__ready(fs) and resolve()




class FileTransfer
  constructor: ->
  download: (url, filename, resolve, reject)->
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob"
    xhr.onreadystatechange = ()->
    if xhr.readyState == XMLHttpRequest.DONE
      if xhr.status is 200
        debugger
      else
        reject(xhr)
    xhr.send()

window.FileTransfer = FileTransfer



window.FS = new FileSystemProxy

window.resolveLocalFileSystemURL = (path, resolve, reject)->
  FS.resolveLocalFileSystemURL(path)
    .then(resolve, reject)
