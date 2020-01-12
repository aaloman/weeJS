/*
 * @file weeJS JavaScript Library released under the MIT license
 * @author ABDULLAH AL LOMAN <apple.cse.brur@gmail.com>
 * @version 1.0.0
 * @date 2020-01-07
 */

(function () {
    wee = function (selector) {
        function fn(selector) {
            if (!(this instanceof fn))
                return new fn(selector);
            selector = selector.replace(/\.(?=\d)/g, '.\\3');
            selector = selector.replace(/#(?=\d)/g, '#\\3');
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                this[i] = elements[i];
            }
            this.length = elements.length;
        }
        fn.prototype = {
            /**
            * Find all html Elements using provided class name
            * @function
            * @param {string} class_name Finding Class Name
            * @return {object} Return htmlElements object which have the following class name
            */
            hasClass: function (class_name) {
                if (this.length) {
                    var newThis = wee.clonePrototypes(this);
                    var ind = 0;
                    for (var i = 0; i < this.length; i++) {
                        var classes = this[i].className.replace(/\s+/g, ' ').split(' ');
                        var c_name = class_name.replace(/\s+/g, '');
                        for (var j = 0; j < classes.length; j++) {
                            if (classes[j] == c_name) {
                                newThis[ind++] = this[i];
                                break;
                            }
                        }
                    }
                    newThis.length = ind;
                    return newThis;
                }
                return this;
            },
            /**
            * Add class name to the html Elements
            * @function
            * @param {string} class_name Class name which have to add
            * @return {object} Return html Elements object after adding new class name
            */
            addClass: function (class_name) {
                if (this.length) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].className += " " + class_name;
                    }
                    return this;
                }
                return this;
            },
            /**
            * Remove class name to the html Elements
            * @function
            * @param {string} class_name Class name which have to remove
            * @return {object} Return html Elements after removing class name
            */
            removeClass: function (class_name) {
                if (this.length) {
                    for (var i = 0; i < this.length; i++) {
                        var start = new Date();
                        this[i].className = this[i].className.replace(new RegExp("\\s{1,}" + class_name, "g"), "");
                        var finish = new Date();
                        console.log("Operation took " + (finish.getTime() - start.getTime()) + " ms");

                    }
                    return this;
                }
                return this;
            },
            /**
            * Toggle class name to the html Elements
            * @function
            * @param {string} class_name1 Class name which have to find
            * @param {string} class_name2 Class name which have to replace
            * @return {object} Return html Elements after toggling class name
            */
            toggleClass: function (class_name1, class_name2) {
                if (this.length) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].className = this[i].className.replace(new RegExp("\\s{1,}" + class_name1, "g"), "");
                        this[i].className += " " + class_name2;
                    }
                    return this;
                }
                return this;
            },
            /**
            * Get first html Element from html Elements object
            * @function
            * @return {object} Return first html Element from html Elements object
            */
            first: function (key) {
                if (this.length) {
                    var newThis = wee.clonePrototypes(this);
                    newThis[0] = this[0]
                    newThis.length = 1;
                    return newThis;
                }
                return this;
            },

            /**
            *  Get last html Element from html Elements object
            * @function
            * @return {object} Return last html Element from html Elements object
            */
            last: function () {
                if (this.length) {
                    var newThis = wee.clonePrototypes(this);
                    newThis[0] = this[this.length - 1]
                    newThis.length = 1;
                    return newThis;
                }
                return this;
            },

            /**
            * Set display:block properties to the html Elemnts
            * @function
            * @return {object} Return html Elements object after adding display:block properties
            */
            show: function () {
                if (this.length) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].style.display = 'block';
                    }
                }
                return this;
            },

            /**
            * Set display:none properties to the html Elemnts
            * @function
            * @return {object} Return html Elements object after adding display:none properties
            */
            hide: function () {
                if (this.length) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].style.display = 'none';
                    }
                }
                return this;
            },

            /**
            * Add eventListener with callback function to the html Elemnts
            * @function
            * @return {object} Return html Elements object after adding display:block properties
            */
            on: function (type, callback) {
                if (this.length) {
                    if (document.addEventListener) {
                        for (var i = 0; i < this.length; i++) {
                            this[i].addEventListener(type, callback, true);
                        }
                    } else if (document.attachEvent) {
                        for (var i = 0; i < this.length; i++) {
                            this[i].attachEvent("on" + type, callback, true);
                        }
                    }
                }
                return this;
            },
            /* Done */
            off: function (type, callback) {
                if (this.length) {
                    console.log("Fucked OFF");
                    if (document.removeEventListener) {
                        for (var i = 0; i < this.length; i++) {
                            this[i].removeEventListener(type, callback, true);
                        }
                    } else if (document.detachEvent) {
                        for (var i = 0; i < this.length; i++) {
                            this[i].detachEvent("on" + type, callback, true);
                        }
                    }
                }
                return this;
            },
            /* Done */
            each: function (callback) {
                if (this.length) {
                    for (var i = 0; i < this.length; i++) {
                        var newThis = wee.clonePrototypes(this);
                        newThis[0] = this[i];
                        newThis.length = 1
                        callback(newThis, i);
                    }
                }
                return this;
            },
            /* Done */
            prev: function () {
                if (this.length) {
                    if (this.length == 1) {
                        var newThis = wee.clonePrototypes(this);
                        preEl = this[0].previousSibling;
                        while (1) {
                            if (preEl == null) break;
                            if (preEl.nodeName == '#text' || preEl == '#comment') {
                                preEl = preEl.previousSibling;
                                continue;
                            }
                            else break;
                        }
                        if (preEl !== null) {
                            newThis[0] = preEl;
                            newThis.length = 1;
                            return newThis;
                        } else {
                            newThis.length = 0;
                            return newThis;
                        }
                    }
                    console.error("The elements have multi valued");
                    return this;
                }
                return this;
            },

            /* Done */
            next: function () {
                if (this.length) {
                    if (this.length == 1) {
                        var newThis = wee.clonePrototypes(this);
                        nextEl = this[0].nextSibling;
                        while (1) {
                            if (nextEl == null) break;
                            if (nextEl.nodeName == '#text' || nextEl.nodeName == '#comment') {
                                nextEl = nextEl.nextSibling;
                                continue;
                            }
                            else break;
                        }
                        if (nextEl !== null) {
                            newThis[0] = nextEl;
                            newThis.length = 1;
                            return newThis;
                        } else {
                            newThis.length = 0;
                            return newThis;
                        }
                    }
                    console.error("The elements have multi valued");
                    return this;
                }
                return this;
            },

            /* Done */
            attr: function (name, value) {
                if (this.length) {
                    if (this.length == 1) {
                        if (!value)
                            return this[0].getAttribute(name);
                        this[0].setAttribute(name, value)
                        return value;
                    }
                    return this;
                }
                return this;
            },
            /* Done */
            parent: function () {
                if (this.length == 1) {
                    var newThis = wee.clonePrototypes(this);
                    newThis[0] = this[0].parentNode;
                    newThis.length = 1
                    return newThis;
                }
                return this;
            },
            /* Done */
            children: function (key) {
                if (this.length == 1) {
                    var newThis = wee.clonePrototypes(this);
                    childs = this[0].childNodes;
                    var j = 0;
                    for (var i = 0; i < childs.length; i++) {
                        if (!(childs[i].nodeName == "#text" || childs[i].nodeName == "#comment")) {
                            newThis[j] = childs[i];
                            j++;

                        }
                    }
                    newThis.length = j;
                    return newThis;
                }
            },
            findParent: function () {
                if (this.length) {
                    this.elements = this.elements.parentNode;
                    return this;
                }
            },
            /* Done */
            html: function (elements) {
                if (this.length) {
                    if (this.length == 1) {
                        if (elements == null) return this[0].innerHTML;
                        else this[0].innerHTML = elements;
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            text: function (text) {
                if (this.length) {
                    if (this.length == 1) {
                        if (text == null) return this[0].textContent || this[0].innerText;
                        else {
                            this[0].textContent = text;
                            this[0].innerText = text;
                        }
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            css: function (styles) {
                if (this.length) {
                    var rules = styles.split(';');
                    for (var i = 0; i < this.length; i++) {
                        for (var j = 0; j < rules.length; j++) {
                            var rule = rules[j].split(':');
                            if (rule[0] !== "" && rule[1] != "") this[i].style[rule[0]] = rule[1];
                        }
                    }
                    return this;
                }
                return this;

            },


            /* Done */
            isEqual: function (obj) {
                if (this.length == obj.length) {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i] !== obj[i]) return false;
                    }
                    return true;
                }
                return false;
            },
            /* Done */
            position: function () {
                if (this.length) {
                    if (this.length == 1) {
                        var box = this[0].getBoundingClientRect();
                        var left = box.left - (parseInt(this[0].style.borderLeftWidth || 0));
                        var top = box.top - parseInt(this[0].style.borderTopWidth || 0);
                        var bottom = box.bottom + parseInt(this[0].style.borderTopWidth || 0) + parseInt(this[0].style.borderBottomWidth || 0);
                        var right = box.right + parseInt(this[0].style.borderLeftWidth || 0) + parseInt(this[0].style.borderRightWidth || 0);
                        return { "top": top, "bottom": bottom, "left": left, "right": right }
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            width: function () {
                if (this.length) {
                    if (this.length == 1) {
                        return this[0].offsetWidth;
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            height: function () {
                if (this.length) {
                    if (this.length == 1) {
                        return this[0].offsetHeight;
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            innerWidth: function () {
                if (this.length) {
                    if (this.length == 1) {
                        return this[0].offsetWidth - parseInt(this[0].style.borderLeftWidth) - parseInt(this[0].style.borderRightWidth);
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            innerHeight: function () {
                if (this.length) {
                    if (this.length == 1) {
                        return this[0].offsetHeight - parseInt(this[0].style.borderTopWidth) - parseInt(this[0].style.borderBottomWidth);
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            outerWidth: function () {
                if (this.length) {
                    if (this.length == 1) {
                        console.log(this[0].getBoundingClientRect());
                        return this[0].offsetWidth + parseInt(this[0].style.marginLeft) + parseInt(this[0].style.marginRight);
                    }
                    return null;
                }
                return null;
            },
            /* Done */
            outerHeight: function () {
                if (this.length) {
                    if (this.length == 1) {
                        return this[0].offsetHeight + parseInt(this[0].style.marginTop) + parseInt(this[0].style.marginBottom);
                    }
                    return null;
                }
                return null;
            },

            /* Done */
            prepend: function (elements) {
                if (this.length) {
                    if (this.length == 1) {
                        var newhtml = elements + wee.html();
                        wee.html(newhtml);
                    }
                    return null;
                }
                return null;
            },

            /* Done */
            append: function (elements) {
                if (this.length) {
                    if (this.length == 1) {
                        var newhtml = wee.html() + elements;
                        wee.html(newhtml);
                    }
                    return null;
                }
                return null;
            }
        }
        var el = fn(selector);
        return el;
    }
    wee.getJson = function (url, callback) {
        var funcName = 'func_' + Math.round(100000 * Math.random());
        window[funcName] = function (data) {
            delete window[funckName];
            document.body.removeChild(script);
            callback(data);
        };
        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + funcName;
        document.body.appendChild(script);
    }
    wee.get = function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        var succss = false;
        var error = false;
        var response = '';
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    succss = true;
                    response = this.responseText;
                } else {
                    error = false;
                }
            }
        }
        request.send();
        request = null;
        callback(response, succss, error);
    }
    wee.post = function () {
        console.log("For post ajax request");
    }
    wee.clonePrototypes = function (obj) {
        function fn() { }
        for (var property in obj) {
            if (!obj.hasOwnProperty(property))
                fn.prototype[property] = obj[property];
        }
        return new fn
    }
    wee.cloneProperties = function (obj) {
        function fn() { }
        for (var property in obj) {
            if (obj.hasOwnProperty(property))
                fn[property] = obj[property];
        }
        return new fn
    }
    wee.cloneAll = function (obj) {
        function fn() { }
        for (var property in obj) {
            if (obj.hasOwnProperty(property))
                fn[property] = obj[property];
            if (!obj.hasOwnProperty(property))
                fn.prototype[property] = obj[property];
        }
        return new fn
    }
    wee.convert = function (els) {
        fn = wee("wee-rxp3d");
        for (var i = 0; i < els.length; i++) {
            fn[i] = els[i];
        }
        fn.length = els.length;
        return fn;
    }
    wee.startTimer = function (callback, duration, repeat) {
        duration = duration || 1000;
        repeat = repeat || 0;
        var timer;
        var counter = 1;
        function start() {
            if (counter == repeat) stop();
            callback(timer, counter);
            counter++;
        }
        timer = setInterval(start, duration);
    }
    wee.stopTimer = function (timer) {
        clearInterval(timer);
    }
    wee.redirect = function (url) {
        window.location.href = url;
    }
    wee.trim = function () { }
    wee.trimLeft = function () { }
    wee.trimRight = function () { }
    wee.stringToJson = function () { }
    wee.jsonToString = function () { }
    wee.replace = function () { }
}
)();

// wee.get('http://www.semanticslab.net', function (r, s, e) {
//     console.log(r);
//     console.log(s);
//     console.log(e);
// });
// JSONP can overcome Cross Origin Policy
// function jsonp(url, callback) {
//     var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
//     window[callbackName] = function(data) {
//         delete window[callbackName];
//         document.body.removeChild(script);
//         callback(data);
//     };

//     var script = document.createElement('script');
//     script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
//     document.body.appendChild(script);
// }

// jsonp('https://api.meetup.com/2/open_events.json?zip=12233&page=30&category=34&time=,1w&key=1719487a4a3c39b3e241e181837529', function(data) {
//    alert(data.meta.description);
// });