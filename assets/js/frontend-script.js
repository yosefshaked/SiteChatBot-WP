jQuery(document).ready(function ($) {
    var $toggleButton = $('.chatbot-toggle-button');
    var $container = $('.chatbot-container');
    var $messages = $('.chatbot-messages');
    var $options = $('.chatbot-options');

    function scrollToBottom() {
        var scrollHeight = $messages.prop('scrollHeight');
        $messages.stop().animate({ scrollTop: scrollHeight }, 300);
    }

    function appendBotMessage(htmlContent) {
        var $messageElement = $('<div></div>');
        $messageElement.addClass('bot-message').html(htmlContent);
        $messages.append($messageElement);
        scrollToBottom();
    }

    function appendUserMessage(textContent) {
        var $messageElement = $('<div></div>');
        $messageElement.addClass('user-message').text(textContent);
        $messages.append($messageElement);
        scrollToBottom();
    }

    function renderMissingStep(stepId) {
        var missingMessage = 'מצטער, הצעד "' + stepId + '" לא נמצא.';
        appendBotMessage(missingMessage);
        $options.empty();
    }

    function renderStep(stepId) {
        if (!siteChatBotData || !siteChatBotData.steps) {
            return;
        }

        var step = siteChatBotData.steps[stepId];

        if (!step) {
            renderMissingStep(stepId);
            return;
        }

        appendBotMessage(step.message);
        $options.empty();

        if (Array.isArray(step.options) && step.options.length > 0) {
            step.options.forEach(function (option) {
                var $button = $('<button type="button" class="chatbot-option-button"></button>');
                $button.text(option.text);
                $button.attr('data-link-to', option.link_to);
                $options.append($button);
            });
        }
    }

    if (siteChatBotData && siteChatBotData.start_step) {
        renderStep(siteChatBotData.start_step);
    }

    $toggleButton.on('click', function () {
        $container.fadeToggle(200, function () {
            if ($container.is(':visible')) {
                $container.attr('aria-hidden', 'false');
                scrollToBottom();
            } else {
                $container.attr('aria-hidden', 'true');
            }
        });
    });

    $options.on('click', '.chatbot-option-button', function () {
        var $clickedButton = $(this);
        var choiceText = $clickedButton.text();
        var nextStepId = $clickedButton.attr('data-link-to');

        appendUserMessage('בחרתי ב: ' + choiceText);

        $options.find('.chatbot-option-button').prop('disabled', true);

        window.setTimeout(function () {
            renderStep(nextStepId);
        }, 400);
    });
});
