export const ProjectService = {
    getData() {
        return [
            {
                id: 2000,
                name: 'תיעו"ד',
                purpose:"תצוגת מערכות מידע",
                description: 'מערכת זו נועדה לספק מידע בצורה מרוכזת נגישה ונוחה על כל המערכות הקיימות בשלבי הפיתוח השונים, \nעל מנת למנוע כפילויות ולאפשר מציאה קלה ונוחה של המערכת הרצויה.  \nהמערכת מרכזת את הנתונים עבור כל מערכת ומאפשרת חיפושים וסינונים שונים.\n עבור כל מערכת יוצגו גם פרטי איש קשר כדי לאפשר יצירת קשר ובדיקת האפשרות להשתמש במערכת הקיימת.',
                productionTime: '',
                status: 'בפיתוח',
                factorableType: "חיצוני",
                external: {
                    name: 'סקייבר',
                    image: 'skyvar.png'
                },
                requires: {
                    name: "יחידת ציפור",
                    command: "פיקוד צפון",
                    branch: "100",
                    contactName:"יפעת",
                    contactPhone:"0529466379",
                    contactEmail:"funesifat@gmail.com"

                },
                classification : 'בלמ"ס',
                environment: "שחורה",
                population: ["קבע","חובה"]
            },
            {
                id: 1000,
                name: 'עקוב אחרי',
                purpose:"זיהוי מכוניות חשודות",
                description: "כאשר המערכת מקבלת זיהוי של מכונית חשודה מופעל באופן אוטומטי מעקב אחר המכונית הכולל ניטור ודיווח על מיקום וקצב הנסיעה עד להגעת כוחות למקום",
                productionTime: '',
                status: 'באפיון',
                factorableType: "חיצוני",
                external: {
                    name: 'אלביט',
                    image: 'elbit.png'
                },
                requires: {
                    name: "יחידת נחל",
                    command: "פיקוד צפון",
                    branch: "100",
                    contactName:"טל",
                    contactPhone:"0523456985",
                    contactEmail:"tal@gmail.com"

                },
                classification : 'סודי',
                environment: "שחורה",
                population: ["מילואים"]
            },
            {
                id: 3000,
                name: "מת\"ח",
                purpose:"קביעת תורים ובדיקת זכאות",
                description: "כיום יש להגיע לסניף על מנת לקבל זכאות.\nמטרת הפרוייקט היא לקבוע את התורים באופן מקוון ולבדוק זכאות לפני הגעה פיזית לתור.",
                productionTime: '',
                status: 'בתהליך',
                factorableType: "חיצוני",
                external: {
                    name: 'סקייבר',
                    image: 'skyvar.png'
                },
                requires: {
                    name: "יחידת מעוף",
                    command: "פיקוד דרום",
                    branch: "100",
                    contactName:"גל",
                    contactPhone:"0534126985",
                    contactEmail:"gal@gmail.com"
                },
                classification : 'סודי',
                environment: "שחורה",
                population: ["מילואים","קבע"]
            },
            {
                id: 4000,
                name: "פיתוח תרשימים",
                purpose:"חידוש ועידכון שאילתות",
                description: "מטרת הפרויקט - חידוש ועדכון שאילתות מורכבות עבור התרשימים המוצגים אחת לחודש.",
                productionTime: 'Thu Sep 05 2024 00:00:00 GMT+0300',
                status: 'עלה לאויר',
                factorableType: "פנימי",
                external: {
                    name: 'פיקוד צפון',
                    image: 'inside.png',
                },
                requires: {
                    name: "יחידת נשר",
                    command: "פיקוד צפון",
                    branch: "100",
                    contactName:"אבי",
                    contactPhone:"0523985624",
                    contactEmail:"avi@gmail.com"

                },
                classification : 'סודי ביותר',
                environment: "אדומה",
                population: ["קבע"]
            }
        ];
    },

    getProjectsSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getProjectsMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getProjectsLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getProjectsXLarge() {
        return Promise.resolve(this.getData());
    },
}
