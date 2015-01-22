$.mockjax({
    url: "/api/test",
    // Need to include the xmlDOM plugin to have this translated into a DOM object
    responseText: {
        name: "Dear user",
        title: "Time to Share"
    }
});