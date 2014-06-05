//Inspired by Ellensaurus on Github: https://github.com/ellensaurus/Quiz
//adapted by William Wolfe-Wylie for Canada.com
//william.wolfewylie@gmail.com
//@wolfewylie

$(document).ready(function() {

	// array containing questions, answers, facts
	var questions = [
		{question: "What's your preferred method of transportation?", choices: ["Luxury cars", "Trains", "Helicopters", "Private jets"], answer: [1, 2, 3, 4]},
		{question: "Who do you look up to?", choices: ["God", "Your mother", "Your forebears", "Yourself"], answer: [1, 2, 3, 4]},
		{question: "Siblings: Awesome or crap?", choices: ["Best friends with mine", "Only child", "Siblings suck", "They're great for extra servants"], answer: [1, 2, 3, 4]},
		{question: "What are your ambitions?", choices: ["Rule the world", "Rule the continent", "Rule the castle", "Rule the roost"], answer: [1, 2, 3, 4]},
		{question: "What's the best way to unwind?", choices: ["A trip to your favourite up-country castle", "A trip to a forgotten corner of the world", "Staying at home and planning world domination", "Vegas, baby!"], answer: [1, 2, 3, 4]}
];

	var questionNumber = 0;
	var correctAnswers = 0;
	var totalQuestions = questions.length;
        var articlelink = "http://o.canada.com/";
        var finalresult = "Name";
        var description = "Placeholder";
        var picturelink = "link.jpg";
	welcomeScreen();

	// welcomeScreen appears when page loads
	function welcomeScreen() {
		$("header").fadeIn(1000);
		$("#beginButton").fadeIn(1000);
		$("#submitButton").hide();
		$("#continueButton").hide();
		$("#retryButton").hide();
	}


	$("#beginButton").click(function(event){
		event.preventDefault();
		nextQuestion();
	});

	// nextQuestion happens when beginButton or continueButton clicked
	function nextQuestion() {
		var currentQuestion = questions[questionNumber];
		$("#beginButton").hide();
		$("header").hide();
		$("#question").text(currentQuestion.question);
		for (i = 0; i < currentQuestion.choices.length; i++){
			$("#choices").append('<input type="radio" name="choice" value=' + currentQuestion.answer[i] + ' class=\'choices\' id=' + currentQuestion.choices[i] + '><label for=' + currentQuestion.choices[i] + '>' + currentQuestion.choices[i] + '</label><br>');		
		}
		$("#question").slideDown("slow");
		$("#choices").slideDown("slow");
		$("#submitButton").fadeIn("slow");
		$("#questionNumber").text("Question " + (questionNumber + 1) + "/" + totalQuestions);
		$("#questionNumber").fadeIn(1000);
	}

	$("#submitButton").click(function(event){
		event.preventDefault();
		checkAnswer();
	});

	// checkAnswer happens when submitButton is clicked
	function checkAnswer() {
		var currentQuestion = questions[questionNumber];
		var userChoice = $('input[name="choice"]:checked').val();
		$("#questionNumber").hide();
		$("#question").hide();
		$("#choices").hide();
		$("#submitButton").hide();
		$("#choices").empty();
		if (!(userChoice)){
			$("retryButton").fadeIn(1000);
		} 	
		else {
			correctAnswers = correctAnswers + parseInt(userChoice);
			questionNumber++;
		}
		if (questionNumber >= questions.length){
			finalScreen();
		} else {
			nextQuestion();
		}			

	}
	
	$("#continueButton").click(function(event){
		event.preventDefault();
		$("#questionNumber").hide();

		$("#continueButton").hide();
	});

	// finalScreen occurs when there are no more questions
	function finalScreen() {
		$("header").hide();
		$("#questionNumber").empty();

 		if (correctAnswers >= 0 && correctAnswers <= totalQuestions) {
                        finalresult = "Queen Elizabeth!";
                        description = "Old school, haughty, stiff upper lip and know how to live in the lap of luxury.";
                        picturelink = "http://wpmedia.o.canada.com/2014/04/483359673.jpg";
		} else if (correctAnswers > totalQuestions && correctAnswers <= 10) {
                        finalresult = "Prince William!";
                        description = "Beloved by all and you know how to make an impression with the commoners.";
						picturelink = "http://wpmedia.o.canada.com/2014/04/485179523_31580525-1.jpg";
		} else if (correctAnswers > 10 && correctAnswers <= 15) {
                        finalresult = "Prince Phillip!";
                        description = "You know how to have fun, but most people treat you as an afterthought (sad for you).";
						picturelink = "http://wpmedia.o.canada.com/2013/06/prince_philip-e1370552969687.jpg";
		}
		else if (correctAnswers > 15 && correctAnswers <= 25) {
                        finalresult = "Prince Harry!";
                        description = "You'll never ascend to the throne, so you may as well have a good time while you can, right?";
						picturelink = "http://wpmedia.o.canada.com/2013/12/xmas13.jpg";
		}
		else {
                        finalresult = "Whoa ... that was weird.";
                        description = "Apparently you are beyond categorization. You should start over again.";
        		}

                var tweet_message = "I got " + finalresult + " Which royal are you?" + " " + articlelink + " via @CanadaDotCom";
                finalresulturl = encodeURIComponent(finalresult);
                descriptionurl = encodeURIComponent(description);
                tweet_messageurl = encodeURIComponent(tweet_message);
                var articlelinkfb = encodeURIComponent(articlelink);
                var tweet_url = "https://twitter.com/intent/tweet?status=" + tweet_messageurl;
                var facebookurl = 'https://www.facebook.com/dialog/feed?display=popup&link=' + articlelinkfb + '&picture=' + picturelink + '&name=I%20got%20' + finalresulturl +'!%20Which%20royal%20are%20you?&description=' + descriptionurl;
                var twitterimage = "https://blog.twitter.com/sites/all/themes/gazebo/img/twitter-bird-white-on-blue.png";
                var facebookimage = "http://0.tqn.com/d/homerenovations/1/0/B/b/-/-/FacebookLogo35x35.jpg";
                $("#finalMessage").append("You are " + finalresult + " <br><br> " + "<img src='" + picturelink + "' width='65%' align='middle'><br><br>" + description + "<br><br>");
                $("#finalMessage").append('Share your results with friends!<br><a href=' + tweet_url + ' target="new"><img src="' + twitterimage + '" alt="Twitter" width="45" align="middle"></a>      <img id="fbshare" src="' + facebookimage + '" alt="fbshare" width="45" align="middle">');		
                   $('#fbshare').click(function(event){
                   	FB.ui(
  						{
    					method: 'feed',
    					name: "I got " + finalresult,
    					link: articlelink,
    					picture: picturelink,
    					caption: description,
    					description: "Find out which member of the royal family you are with the Canada.com Royal Family Quiz"
  },
  function(response) {
    if (response && response.post_id) {
      alert('Post was published.');
    } else {
      alert('Post was not published.');
    }
  }
);
   					elem = $(this);
   					postToFeed(elem.data('title'), elem.data('desc'),
    				elem.prop('href'), 
   					elem.data('image'));

   					return false;
    				});		
                $("#finalMessage").fadeIn(1000);
		$("#retryButton").fadeIn(1000);

	}

	$("#retryButton").click(function(event){
		event.preventDefault();
		questionNumber = 0;
		correctAnswers = 0;
		$("#finalMessage").empty();
		$("#finalMessage").hide();
		$("#retryButton").hide();
		welcomeScreen();
	});
});