# SiteChatBot-WP Conversation Bot Overview | סקירת בוט SiteChatBot-WP

## English
- **Purpose:** Provide a floating, button-driven chatbot that guides visitors through predefined conversation steps stored as a custom post type.
- **Custom Post Type:** `scbwp_qa` stores each conversation step. The post title must be a unique English slug (e.g., `main_menu`). The content holds the bot message and `[option link_to="target_slug"]Button Label[/option]` shortcodes for the menu options.
- **Frontend Behaviour:** The chatbot toggles from a floating button, shows the bot message history, and renders option buttons for the current step. Clicking a button records the choice and loads the next step.
- **UI Enhancements (2024 refresh):** The launcher and chat window now follow a CSS custom-properties design system keyed to the site's teal palette, with responsive spacing, stronger elevation, and animated open/close transitions. The header keeps the inline close button while the toggle button wraps its icon for precise styling.
- **Localization:** All visible UI text is presented in Hebrew while preserving the slug requirements for linking between steps.
- **Data Flow:** PHP collects and sanitizes the steps, exposing them to JavaScript through `siteChatBotData`. The browser renders steps with `renderStep`, ensuring a deterministic flow based on the configured links.

## עברית
- **מטרה:** לספק בוט צף המונחה באמצעות כפתורים, שמוביל את המבקרים דרך צעדי שיחה מוגדרים מראש הנשמרים בטיפוס פוסט ייעודי.
- **טיפוס פוסט מותאם:** `scbwp_qa` מאחסן כל צעד שיחה. כותרת הפוסט חייבת להיות מזהה ייחודי באנגלית (לדוגמה `main_menu`). התוכן מכיל את הודעת הבוט ואת הקיצורים `[option link_to="target_slug"]תווית הכפתור[/option]` עבור אפשרויות התפריט.
- **התנהגות פרונטנד:** הבוט נפתח מכפתור צף, מציג היסטוריית הודעות ומייצר כפתורי אפשרויות עבור הצעד הנוכחי. לחיצה על כפתור מתעדת את הבחירה וטוענת את הצעד הבא.
- **שדרוג ממשק (ריענון 2024):** הכפתור הצף והחלונית נשענים על מערכת עיצוב מבוססת משתני CSS בגוון הטורקיז של האתר, עם ריווח מותאם למובייל, אפקט צל מודגש ואנימציות פתיחה/סגירה חלקות. האיקון עטוף באלמנט ייעודי והכותרת ממשיכה לכלול כפתור סגירה.
- **לוקליזציה:** כל הטקסטים הגלויים למשתמש מוצגים בעברית תוך שמירה על דרישת הסלאג האנגלי לקישור בין צעדים.
- **זרימת נתונים:** PHP אוסף ומסנן את הצעדים ומעביר אותם ל-JavaScript דרך `siteChatBotData`. הדפדפן מציג צעדים באמצעות `renderStep`, מה שמבטיח זרימה דטרמיניסטית בהתאם לקישורים שהוגדרו.
