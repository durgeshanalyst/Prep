// Basic Auth Logic
const auth = firebase.auth();
const loginBtn = document.getElementById('btn-login');
const logoutBtn = document.getElementById('btn-logout');
const heroCta = document.getElementById('hero-cta');

// Login
const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(e => alert(e.message));
};

// Listeners
if(loginBtn) loginBtn.onclick = handleLogin;
if(heroCta) heroCta.onclick = handleLogin;
if(logoutBtn) logoutBtn.onclick = () => auth.signOut();

// State Change
auth.onAuthStateChanged(user => {
    if (user) {
        app.currentUser = user;
        app.showView('dashboard');
        document.getElementById('user-name').innerText = user.displayName;
    } else {
        app.currentUser = null;
        app.showView('landing');
    }
});