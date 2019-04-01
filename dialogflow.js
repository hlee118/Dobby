// modules
let statics = require("./lib/statics");

// intent status
const READY = "READY";
const SELECT_DETAIL = "SELECT_DETAIL";
const SELECTED = "SELECTED";

// actions functions
const {
    dialogflow,
    Permission,
    Suggestions,
} = require('actions-on-google');

const app = dialogflow({
    // debug: true,
});


/*
    Functions
 */
function initStorage(conv) {
    conv.user.storage = {};
    conv.user.storage.intent_status = READY;
    conv.user.storage.page_list = undefined;
    conv.user.storage.selected_page = undefined;
}

function getPageResult(arr, conv, query) {
    let locale = conv.user.storage.locale;

    if (arr.length === 0) {
        // No result
        return locale.NO_RESULT;

    } else if (arr.length === 1) {
        // A result
        conv.user.storage.intent_status = SELECTED;
        conv.user.storage.selected_page = arr[0];
        return (arr[0].page_name + ". " + locale.IS_THIS_WHAT_YOU_WANT);

    } else {
        // Multi results
        conv.user.storage.intent_status = SELECT_DETAIL;
        conv.user.storage.page_list = arr;

        let str = "";
        for (let i = 0; i < arr.length; i++) {
            // Summarize
            let page_name = arr[i].page_name;
            if (page_name.indexOf(query) === 0)
                page_name = page_name.replace(query + " ", "");
            else
                page_name = page_name.replace(" " + query, "");
            page_name = page_name.replace("  ", " ");
            str += page_name;
            if (i !== arr.length - 1)
                str += ", ";
        }
        str += ". ";
        return (str + locale.SELECTION);
        // conv.ask(new Suggestions(list));
    }
}


/*
    Intents
 */

function intentSelectedYes(conv, query) {
    let locale = conv.user.storage.locale;
    let page = conv.user.storage.selected_page;
    if (page === undefined) {
        // page hasn't picked yet
        conv.ask(locale.COULD_YOU_BE_MORE_PRECISE);
    } else {
        // page picked
        let parser_class = require("./parser_selenium/parser");
        let parser = new parser_class(page, locale);
        return parser.getText().then((text) => {
            initStorage(conv);
            conv.ask(text);
        });
    }
}

function intentSelectedNo(conv, query) {
    initStorage(conv);
    conv.ask(conv.user.storage.locale.CAN_YOU_REPEAT_AGAIN);
}

function intentGetPageDetail(conv, query) {
    let page_list = conv.user.storage.page_list;
    let results = page_list.filter(page => page.page_name.includes(query));
    let text = getPageResult(results, conv, query);
    conv.ask(text);
}

function intentGetPage(conv, result) {
    console.log(result);
    conv.ask(result.toString());
}

function intentFallback(conv, result) {
    let object = getLanguageSet(conv.request.user.locale);
    conv.ask(object.NO_RESULT);
}

/*
    Google Actions Intents
 */

// Google Actions Default Welcome Intent
app.intent('Welcome Intent', conv => {
    initStorage(conv);

    let object = getLanguageSet(conv.request.user.locale);
    conv.ask(object.HI);
});

// Google Actions Default Cancel Intent
app.intent('Cancel Intent', conv => {
    let object = getLanguageSet(conv.request.user.locale);
    conv.close(object.BYE);
});

// Google Actions All Other Intents
app.intent('Any Intent', conv => {
    let query = conv.body.queryResult.queryText;
    let storage = conv.user.storage;
    let locale = conv.request.user.locale;

    return new Promise((resolve) => {
        /* Analyze Query */
        let analyzer_class = getAnalyzerClass(locale);
        let analyzer = new analyzer_class(query, storage, resolve);
        analyzer.execute();
    }).then((result) => {
        /* Get Data and Give Result */
        if (storage.intent_status === SELECTED && result.type === statics.TYPE_YES) {
            // Page selected, want to see them
            intentSelectedYes(conv, result.data);

        } else if (storage.intent_status === SELECTED && result.type === statics.TYPE_NO) {
            // Page selected, don't want to see them
            intentSelectedNo(conv, result.data);

        } else if (storage.intent_status === SELECT_DETAIL && result.type === statics.TYPE_ASK) {
            // Select page
            intentGetPageDetail(conv, result.data);

        } else if (storage.intent_status === READY && result.type === statics.TYPE_ASK) {
            // Select page
            intentGetPage(conv, result.data);

        } else {
            // Fallback
            intentFallback(conv, result.data);
        }
    })
});

function getAnalyzerClass(locale) {
    switch (locale) {
        case "en-US":
            return require("./analyzerEN/analyzer");
        case "en":
            return require("./analyzerEN/analyzer");
        case "ko":
            return require("./analyzerKR/analyzer");
        default:
            return require("./analyzerKR/analyzer");
    }
}

function getLanguageSet(locale){
    switch (locale) {
        case "en-US":
            return require("./lang/en");
        case "en":
            return require("./lang/en");
        case "ko":
            return require("./lang/kr");
        default:
            return require("./lang/kr");
    }
}

module.exports = app;
