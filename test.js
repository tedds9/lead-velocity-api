// Native node data injector to bypass Windows PowerShell bugs
const testPayload = JSON.stringify({
    name: "Todd Daniels",
    phone: "+12505550192",
    serviceNeeded: "Custom Drop Inventory Setup"
});

fetch('https://lead-velocity-api.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: testPayload
})
.then(res => res.json())
.then(data => console.log('🟢 SERVER RESPONSE:', data))
.catch(err => console.error('❌ FAILED TO REACH SERVER:', err));
