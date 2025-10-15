jQuery(document).ready(function ($) {
    var $toggleButton = $('.chatbot-toggle-button');
    var $container = $('.chatbot-container');
    var $closeButton = $('.chatbot-close-button');
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

    function updateAccessibilityState(isOpen) {
        $container.attr('aria-hidden', isOpen ? 'false' : 'true');
        $toggleButton.attr('aria-expanded', isOpen ? 'true' : 'false');
        $messages.attr('tabindex', isOpen ? '0' : '-1');

        if (isOpen) {
            $messages.focus();
        }
    }

    updateAccessibilityState($container.hasClass('is-open'));

    $toggleButton.on('click', function () {
        var willOpen = !$container.hasClass('is-open');
        $container.toggleClass('is-open', willOpen);
        updateAccessibilityState(willOpen);

        if (willOpen) {
            scrollToBottom();
        } else {
            $toggleButton.focus();
        }
    });

    $closeButton.on('click', function () {
        $container.removeClass('is-open');
        updateAccessibilityState(false);
        $toggleButton.focus();
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
