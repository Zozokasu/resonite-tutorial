(function () {
    var as = document.querySelectorAll('a.header')
    var newList = document.createElement('ul');
    newList.setAttribute('class', 'innerLink');
    for (var i = 1, l = as.length; i < l; i += 1) {
        var a = as[i];
        var label = a.innerText;
        var href = a.getAttribute('href');
        var newAnchor = document.createElement('a');
        newAnchor.setAttribute('href', href);
        newAnchor.innerHTML = label;
        var newItem = document.createElement('li');
        newItem.appendChild(newAnchor);
        newList.appendChild(newItem);
    }
    document.querySelector('.sidebar .active').appendChild(newList);
})();