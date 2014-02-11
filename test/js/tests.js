(function () {
  var textInputElement;
  var iframeHandler;

  beforeEach(function (done) {
    iframeHandler = harnessUtils.createIframe('test/html/test.html', function (win, doc) {
      textInputElement = iframeHandler.document.querySelector('ceci-text-mapper');
      done();
    });
  });

  describe('Ceci Text Input', function () {
    test('Sanity check', function (done) {
      chai.assert(textInputElement.ceci, 'Ceci descriptor exists.');
      iframeHandler.runIframeTest('Sanity Check', done);
    });

    test('Broadcasts', function (done) {
      iframeHandler.testBroadcasts(textInputElement, done, {
        check: {
          sendData: function (e, channel) {
            chai.assert.equal(e.detail.data, 'you must construct additional pylons', 'Component attached correct value to event.');
            chai.assert.equal(e.detail.data, textInputElement.getAttribute('value'), 'Correct component broadcasted ' + channel + ' event.');
          }
        },
        execute: {
          sendData: function (channel) {
            var e = iframeHandler.document.createEvent('MouseEvents');
            e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
            textInputElement.$.inputText.value = "you must construct additional pylons";
            textInputElement.$.button.dispatchEvent(e);
          }
        }
      });
    });

    test('Listeners', function (done) {
      iframeHandler.testListeners(textInputElement, done, {
        check: {
          click: function (e, channel) {
            chai.assert(true, 'Click event occured.');
          }
        }
      });
    });
  });
})();
