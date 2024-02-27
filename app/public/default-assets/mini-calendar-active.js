(function ($) {
    "use strict";
    var db_events = [{
            title: "Board members meeting.",
            date: 1532381440036,
            link: "events.com/ev2"
            },
        {
            title: "Delaware branch opening.",
            date: 1532467961534,
            link: "events.com/ev1"
            },
        {
            title: "An important event.",
            date: 1532554405128,
            link: "events.com/ev1"
            }
        ];

    $(document).ready(function () {
        $("#calendar").MEC({
            calendar_link: "example.com/myCalendar",
            events: db_events
        });

        //if you don't have events, use
        $("#calendar2").MEC();
    });

})(jQuery);