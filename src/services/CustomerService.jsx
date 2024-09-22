export const CustomerService = {
    getData() {
        return [
            {
                id: 2000,
                name: 'תיעוד',
                goal:"תיעוד פרויקטים",
                description: "פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.",
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
                    branch: "100"
                },
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
                    branch: "100"
                },
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
                    branch: "100"
                },
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
                    branch: "100"
                },
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
