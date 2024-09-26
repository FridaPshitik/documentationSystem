export const CustomerService = {
    getData() {
        return [
            {
                id: 2000,
                name: 'תיעו"ד',
                goal:"תצוגת מערכות מידע",
                description: 'מערכת זו נועדה לספק מידע בצורה מרוכזת נגישה ונוחה על כל המערכות הקיימות בשלבי הפיתוח השונים, \nעל מנת למנוע כפילויות ולאפשר מציאה קלה ונוחה של המערכת הרצויה.  \nהמערכת מרכזת את הנתונים עבור כל מערכת ומאפשרת חיפושים וסינונים שונים.\n עבור כל מערכת יוצגו גם פרטי איש קשר כדי לאפשר יצירת קשר ובדיקת האפשרות להשתמש במערכת הקיימת.',
                date: '',
                status: 'בפיתוח',
                type: "חיצוני",
                representative: {
                    name: 'סקייבר',
                    image: 'skyvar.png'
                },
                demand: {
                    name: "יחידת ציפור",
                    section: "פיקוד צפון",
                    branch: "100",
                    contactName:"יפעת",
                    contactPhone:"0556412421"
                },
                classification : 'בלמ"ס',
                devEnvironment: "שחורה",
                population: ["קבע","חובה"]
            },
            {
                id: 1000,
                name: 'עקוב אחרי',
                goal:"זיהוי מכוניות חשודות",
                description: "כאשר המערכת מקבלת זיהוי של מכונית חשודה מופעל באופן אוטומטי מעקב אחר המכונית הכולל ניטור ודיווח על מיקום וקצב הנסיעה עד להגעת כוחות למקום",
                date: '',
                status: 'באפיון',
                type: "חיצוני",
                representative: {
                    name: 'אלביט',
                    image: 'elbit.png'
                },
                demand: {
                    name: "יחידת נחל",
                    section: "פיקוד צפון",
                    branch: "100",
                    contactName:"טל",
                    contactPhone:"0523456985"
                },
                classification : 'סודי',
                devEnvironment: "שחורה",
                population: ["מילואים"]
            },
            {
                id: 3000,
                name: "מת\"ח",
                goal:"קביעת תורים ובדיקת זכאות",
                description: "כיום יש להגיע לסניף על מנת לקבל זכאות.\nמטרת הפרוייקט היא לקבוע את התורים באופן מקוון ולבדוק זכאות לפני הגעה פיזית לתור.",
                date: '',
                status: 'הושלם',
                type: "חיצוני",
                representative: {
                    name: 'סקייבר',
                    image: 'skyvar.png'
                },
                demand: {
                    name: "יחידת מעוף",
                    section: "פיקוד דרום",
                    branch: "100",
                    contactName:"גל",
                    contactPhone:"0534126985"
                },
                classification : 'סודי',
                devEnvironment: "שחורה",
                population: ["מילואים","חובה","קבע"]
            },
            {
                id: 4000,
                name: "פיתוח תרשימים",
                goal:"חידוש ועידכון שאילתות",
                description: "מטרת הפרויקט - חידוש ועדכון שאילתות מורכבות עבור התרשימים המוצגים אחת לחודש.",
                date: '2020-09',
                status: 'עלה לאויר',
                type: "פנימי",
                representative: {
                    name: 'פיקוד צפון',
                    image: 'inside.png',
                },
                demand: {
                    name: "יחידת נשר",
                    section: "פיקוד צפון",
                    branch: "100",
                    contactName:"אבי",
                    contactPhone:"0523985624"
                },
                classification : 'סודי ביותר',
                devEnvironment: "אדומה",
                population: ["קבע"]
            }
        ];
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    },
}
