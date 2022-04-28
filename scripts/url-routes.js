const urlPageTitle = "Toonland Blog";

document.addEventListener('click', e => {
    const {target} = e;
    // console.log(target,'target');
    if(!target.matches('nav a')) return;
    e.preventDefault();
    urlRoute();
});

const urlRoutes =  {
    404: {
        pages: "pages/404.html",
        title: "404 | " + urlPageTitle,
        description: ""
    },
    '/': {
        pages: "pages/index.html",
        title: "Home | " + urlPageTitle,
        description: ""
    },
    "/about": {
        pages: "pages/about.html",
        title: "About | " + urlPageTitle,
        description: ""
    },
    "/contact": {
        pages: "pages/contact.html",
        title: "Contact | " + urlPageTitle,
        description: ""
    }
}

const urlRoute = (e) => {
    e = e || window.event;
    e.preventDefault();
    window.history.pushState({}, "" , e.target.href);
    urlLocatoionHandler();
};

const urlLocatoionHandler = async() => {
    const location = window.location.pathname;
    if(location.length ===  0) {
        location = "/";
    }
    const route = urlRoutes[location] || urlRoutes["404"];
    const html = await fetch(route.pages).then(res =>
         res.text());
    document.querySelector("#content").innerHTML = html;
    document.title = route.title;
    document
        .querySelector("meta[name=description]")
        .setAttribute("content", route.description);
    }

    window.onpopstate = urlLocatoionHandler;
    window.route = urlRoute;

    urlLocatoionHandler();




