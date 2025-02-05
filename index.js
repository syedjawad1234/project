const firebaseConfig = {
    apiKey: "AIzaSyBrAunpJpJTblNA5t0kTpIgxevXJkodIMY",
    authDomain: "fir-chart-app-1e12b.firebaseapp.com",
    databaseURL: "https://fir-chart-app-1e12b-default-rtdb.firebaseio.com",
    projectId: "fir-chart-app-1e12b",
    storageBucket: "fir-chart-app-1e12b.firebasestorage.app",
    messagingSenderId: "62859982528",
    appId: "1:62859982528:web:ce050f7abf9dde12055f25",
    measurementId: "G-B7M57EBBJF"
  };

  
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = firebase.firestore();

// DOM elements
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

// Sending messages to Firestore
sendButton.addEventListener("click", async () => { // Fixed typo
    const message = messageInput.value;
    if (message.trim()) {
        try {
            await db.collection("messages").add({
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            messageInput.value = ''; // Clear input after sending
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
});

// Listen for messages in Firestore
db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((querySnapshot) => {
        chatMessages.innerHTML = ''; // Clear existing messages
        querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageElement = document.createElement("div");
            messageElement.textContent = messageData.text;
            chatMessages.appendChild(messageElement);
        });
    });