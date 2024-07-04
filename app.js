document.addEventListener('DOMContentLoaded', () => {
    const chatList = document.getElementById('chatList');
    const messageArea = document.getElementById('messageArea');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const currentChatName = document.getElementById('currentChatName');
    const currentChatAvatar = document.getElementById('currentChatAvatar');
    const sidebar = document.getElementById('sidebar');
    const chatArea = document.getElementById('chatArea');
    const backButton = document.getElementById('backButton');

    let currentChat = null;

    const createChatListItem = (name, avatarUrl) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${avatarUrl}" alt="${name}'s Avatar" class="chatAvatar">
            <span>${name}</span>
        `;
        li.addEventListener('click', () => loadChat(name, avatarUrl));
        return li;
    };

    const loadChat = (name, avatarUrl) => {
        currentChat = name;
        currentChatName.textContent = name;
        currentChatAvatar.src = avatarUrl;
        currentChatAvatar.alt = `${name}'s Avatar`;
        messageArea.innerHTML = '';
        addMessage(`Welcome to your chat with ${name}!`, 'other');
        
        if (window.innerWidth <= 768) {
            sidebar.style.display = 'none';
            chatArea.classList.add('active');
        }
    };

    const addMessage = (content, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'other-message');
        messageElement.textContent = content;
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    };

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message && currentChat) {
            addMessage(message, 'user');
            messageInput.value = '';
            // Simulate a reply (replace with actual backend logic)
            setTimeout(() => {
                addMessage(`Reply to: ${message}`, 'other');
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    newChatBtn.addEventListener('click', () => {
        const chatName = prompt('Enter a name for the new chat:');
        if (chatName) {
            const avatarUrl = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(chatName)}.svg`;
            chatList.appendChild(createChatListItem(chatName, avatarUrl));
            loadChat(chatName, avatarUrl);
        }
    });

    settingsBtn.addEventListener('click', () => {
        alert('Settings functionality to be implemented');
    });

    backButton.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.style.display = 'block';
            chatArea.classList.remove('active');
        }
    });

    // Initialize with some example chats
    const exampleChats = [
        { name: 'Alice', avatarUrl: 'https://avatars.dicebear.com/api/avataaars/alice.svg' },
        { name: 'Bob', avatarUrl: 'https://avatars.dicebear.com/api/avataaars/bob.svg' },
        { name: 'Charlie', avatarUrl: 'https://avatars.dicebear.com/api/avataaars/charlie.svg' }
    ];

    exampleChats.forEach(chat => {
        chatList.appendChild(createChatListItem(chat.name, chat.avatarUrl));
    });

    if (chatList.firstChild) {
        chatList.firstChild.click();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.style.display = 'block';
            chatArea.classList.add('active');
        } else {
            if (currentChat) {
                sidebar.style.display = 'none';
                chatArea.classList.add('active');
            } else {
                sidebar.style.display = 'block';
                chatArea.classList.remove('active');
            }
        }
    });
});