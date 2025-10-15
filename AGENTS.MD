# Guidance for Agents Working on SiteChatBot-WP

## English
- All visible UI strings presented to site visitors must remain in Hebrew to satisfy localization requirements.
- Conversation steps are stored in the `scbwp_qa` custom post type. The post **title** is treated as a unique English slug (e.g., `main_menu`). The plugin sanitizes this slug before exposing it to the frontend.
- Step content may include button definitions using `[option link_to="target_slug"]Button Label[/option]`. The `link_to` attribute should reference another step slug. Button labels are displayed in Hebrew on the frontend.
- Frontend logic expects data within `siteChatBotData.steps`. When adding new behaviours, keep `renderStep` as the single entry point for rendering a state.

## עברית
- כל המחרוזות הגלויות למשתמש באתר חייבות להישאר בעברית כדי לעמוד בדרישות הלוקליזציה.
- צעדי השיחה נשמרים בטיפוס הפוסט המותאם `scbwp_qa`. כותרת הפוסט משמשת כסלאג ייחודי באנגלית (לדוגמה `main_menu`) ועוברת סניטציה לפני חשיפה לפרונטנד.
- תוכן הצעד יכול לכלול הגדרות כפתור באמצעות `[option link_to="target_slug"]תווית כפתור[/option]`. הערך ב-`link_to` צריך להפנות לסלאג של צעד אחר. תוויות הכפתורים מוצגות בעברית בפרונטנד.
- הלוגיקה בפרונטנד מצפה למבנה נתונים בתוך `siteChatBotData.steps`. בעת הרחבות חדשות שמרו על `renderStep` כנקודת הכניסה היחידה להצגת מצב.
