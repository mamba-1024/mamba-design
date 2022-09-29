export const outClick = `(function(window){

  var registeredIds = {}
  var OutClickListeners = [{listener: null, exceptions: []}]

  var addEventListener = Node.prototype.addEventListener
  var removeEventListener = Node.prototype.removeEventListener

  /** This handles any listener set by .onclick prototype property */
  Object.defineProperty(Node.prototype, 'onoutclick', {
    set: function (func) {
      OutClickListeners[0] = {
        exceptions: [this],
        listener: func && func.bind(this)
      }

      return func
    }
  })

  /** This handles all addEventListener */
  window.Node.prototype.addEventListener = function (type, listener, exceptions) {
    if (type == 'outclick') {
      var id = null

      while (registeredIds[(id = (Math.random() * 100000).toString())]) {}
      registeredIds[id] = listener

      exceptions = exceptions || []
      exceptions.push(this)
      OutClickListeners.push({
        exceptions: exceptions,
        listener: listener && listener.bind(this),
        id: id
      })

      return id
    } else {
      addEventListener.apply(this, arguments)
    }
  }

  window.document.addEventListener('click', function(e){
    for(var i = OutClickListeners.length; i--;){
      var listener = OutClickListeners[i]
      var contains = false

      for(var g = listener.exceptions.length; g--;){
        if (listener.exceptions[g].contains(e.target)) {
          contains = true
          break
        }
      }

      if(!contains){
        listener.listener && listener.listener(e)
      }
    }
  })

  /** Getting rid of event listeners */
  window.Node.prototype.removeEventListener = function (event, listener) {
    if (event == 'outclick') {
      var id = -1

      if (typeof listener == 'function') {
        for(i in registeredIds){
          if (listener.toString() == registeredIds[i].toString()) {
            id = i
            break
          }
        }
      } else {
        id = listener
      }
      for(var i = OutClickListeners.length; i--;){
        var outListener = OutClickListeners[i]
        if(outListener.id == id) {
          OutClickListeners.splice(i,1)
          break
        }
      }
    } else {
      removeEventListener.apply(this, arguments)
    }
  }

  /** This handles the HTML onclick property */
  var elements = document.querySelectorAll('[outclick]')

  ;[].forEach.call(elements, function(e){
    var outclick = e.getAttribute('outclick')
    var func = Function(outclick)
    OutClickListeners.push({
      listener: func,
      exceptions: [e]
    })
  })

})(window)`;

export const outClickMin = `(function(e){var g={},f=[{listener:null,exceptions:[]}],h=Node.prototype.addEventListener,k=Node.prototype.removeEventListener;Object.defineProperty(Node.prototype,"onoutclick",{set:function(c){f[0]={exceptions:[this],listener:c&&c.bind(this)};return c}});e.Node.prototype.addEventListener=function(c,a,d){if("outclick"==c){for(var b;g[b=(1E5*Math.random()).toString()];);g[b]=a;d=d||[];d.push(this);f.push({exceptions:d,listener:a&&a.bind(this),id:b});return b}h.apply(this,arguments)};e.document.addEventListener("click",
function(c){for(var a=f.length;a--;){for(var d=f[a],b=!1,e=d.exceptions.length;e--;)if(d.exceptions[e].contains(c.target)){b=!0;break}b||d.listener&&d.listener(c)}});e.Node.prototype.removeEventListener=function(c,a){if("outclick"==c){var d=-1;if("function"==typeof a)for(b in g){if(a.toString()==g[b].toString()){d=b;break}}else d=a;for(var b=f.length;b--;)if(f[b].id==d){f.splice(b,1);break}}else k.apply(this,arguments)};e=document.querySelectorAll("[outclick]");[].forEach.call(e,function(c){var a=
c.getAttribute("outclick"),a=Function(a);f.push({listener:a,exceptions:[c]})})})(window);`;
