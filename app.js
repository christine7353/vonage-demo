// replace these values with those generated in your TokBox Account
var apiKey = "47468341";
var sessionId = "2_MX40NzQ2ODM0MX5-MTY0NzgwMDExOTc5NX5jRTdaY2Q5TW9iWnMydUdqb1J5SG5hMEl-fg";
var token = "T1==cGFydG5lcl9pZD00NzQ2ODM0MSZzaWc9M2I3ZjBmNjI1ZTQ2NzA4ODU1NTU1OThiYzJhMWEzNTAxZGFhZjZkYzpzZXNzaW9uX2lkPTJfTVg0ME56UTJPRE0wTVg1LU1UWTBOemd3TURFeE9UYzVOWDVqUlRkYVkyUTVUVzlpV25NeWRVZHFiMUo1U0c1aE1FbC1mZyZjcmVhdGVfdGltZT0xNjQ3ODAwMjU1Jm5vbmNlPTAuNjI1MDA2OTM1NTE2NTgxJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2NTAzOTIyNTUmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

// (optional) add server code here
var newSubscriber = initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
    var videoToggle = document.getElementById('videoCheckbox');

    // Subscribe to a newly created stream
  
    var subscriber = session.on('streamCreated', function(event) {
        subscriber = session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);

        return subscriber; 
      });

//Adding a DOM listiner to check the state of our connect/disconnect to stream toggle

      document.addEventListener('DOMContentLoaded', function () {
        videoToggle.addEventListener('change', function () {
          if (videoToggle.checked) {
            console.log("test on")
            //subscriber.subscribeToVideo(true); // video on
            session.on('streamCreated', function(event) { // subscribe to stream
              subscriber = session.subscribe(event.stream, 'subscriber', {
                insertMode: 'append',
                width: '100%',
                height: '100%'
              }, handleError);
            });
            console.log('Checked');
          } else {
            console.log("test off")
            //subscriber.subscribeToVideo(false); // video off
            session.unsubscribe(subscriber); // unsubscribe from stream
            console.log('Not checked');
          }
        });
      });
      

    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    }
    );
return subscriber
  }