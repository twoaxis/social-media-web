document.getElementById('postInput').addEventListener('focus', function() {
    this.style.backgroundColor = 'white';
    this.style.border = '1px solid #ccc';
});

document.getElementById('postInput').addEventListener('blur', function() {
    this.style.backgroundColor = '#f0f2f5';
    this.style.border = 'none';
});