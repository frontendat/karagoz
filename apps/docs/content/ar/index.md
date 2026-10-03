---
h1Class: "mb-0"
---

:::landing-hero
---
headline: Karagöz
subline: أدوات تفاعلية لعرض الشيفرة البرمجية وتعليمها.
---
:::

:::landing-teaser-grid
---
count: 2
---

    ::::landing-teaser
    ---
    headline: Karagöz Sandbox
    buttonText: ابدأ الآن
    buttonLink: /sandbox
    ---
    عروض شيفرة تفاعلية أقوى بفضل تقنية WebContainers.
    ::::

    ::::landing-teaser
    ---
    headline: Karagöz Puppeteer
    buttonText: قريبًا
    ---
    دروس برمجة بمستوى جديد كليًا عبر واجهة مستخدم متكاملة.
    ::::

:::

:::html-tag{tag='div' class='mx-auto prose dark:prose-invert'}

:html-tag{tag='h3' content='لمحة تاريخية...'}
    
يشير اسم **Karagöz** (كراكوز)
إلى :external-link{href='https://en.wikipedia.org/wiki/Karag%C3%B6z_and_Hacivat' content='كراكوز وعيواظ'}،
الشخصيتين الرئيسيتين في مسرح خيال الظل التركي التقليدي، الذي ازدهر في العهد العثماني ثم انتشر في معظم الدول التي 
كانت جزءًا من الدولة العثمانية.

<figure>
    <img src="img/karagoz-and-hacivat.png" alt="كراكوز وعيواظ - المصدر: ويكيبيديا" />
    <figcaption>كراكوز وعيواظ - المصدر: ويكيبيديا</figcaption>
</figure>

بدا الاسم مناسبًا للأسباب التالية:
* أنا سوري، وهذا الفن جزء من تراثي.
* الغاية من هذه الأدوات أن يستخدم مُعِدّ المحتوى المكوّنات المتوفرة ليروي قصة بالشيفرة البرمجية.
 
ثم إن تسمية الأشياء أمر صعب. وقد سعدت بالعثور على اسم فريد ونطاق متاح 😅

:html-tag{tag='h3' content='ولكن، لماذا Vue.js؟'}

كانت فكرتي الأولى إنشاء مجموعة
من :external-link{href='https://developer.mozilla.org/en-US/docs/Web/API/Web_components' content='مكوّنات الويب (Web Components)'}
يمكن استخدامها في أي سياق. لكنني سرعان ما واجهت عقبات بسبب خبرتي المحدودة بهذه التقنية، والمستوى العالي من 
التفاعلية (Reactivity) المطلوب.

لهذا السبب، ولأن Vue.js هو إطار العمل المفضّل لدي، اخترت بناء المكوّنات خصيصًا له (على الأقل في الوقت الحالي).

لا يزال بناء Web Component باستخدام Vue وVite ممكنًا، لكنه قد يجلب تحديات لست مستعدًا للتعامل معها في الوقت الراهن.

فلنجرّبه إذًا، وبرمجة ممتعة!

:::
