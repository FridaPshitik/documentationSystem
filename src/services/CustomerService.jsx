export const CustomerService = {
    getData() {
        return [
            {
                id: 2000,
                name: 'תיעוד',
                goal: "פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.",
                date: '2015-09-13',
                status: 'בפיתוח',
                type: "חיצוני",
                representative: {
                    name: 'סקייבר',
                    image: 'skyvar'
                }
            },
            {
                id: 1000,
                name: 'עקוב אחרי',
                goal: "כאשר המערכת מקבלת זיהוי של מכונית חשודה מופעל באופן אוטומטי מעקב אחר המכונית הכולל ניטור ודיווח על מיקום וקצב הנסיעה עד להגעת כוחות למקום",
                date: '2015-09-13',
                status: 'באפיון',
                type: "חיצוני",
                representative: {
                    name: 'אלביט',
                    image: 'elbit'
                }
            },
            {
                id: 3000,
                name: "מת\"ח",
                goal: "כיום יש להגיע לסניף על מנת לקבל זכאות.\nמטרת הפרוייקט היא לקבוע את התורים באופן מקוון ולבדוק זכאות לפני הגעה פיזית לתור.",
                date: '2015-09-13',
                status: 'הושלם',
                type: "פנימי",
                representative: {
                    name: 'סקייבר',
                    image: 'skyvar'
                }
            },
            {
                id: 4000,
                name: "פיתוח תרשימים",
                goal: "מטרת הפרויקט - חידוש ועדכון שאילתות מורכבות עבור התרשימים המוצגים אחת לחודש.",
                date: '2015-09-13',
                status: 'עלה לאויר',
                type: "חיצוני",
                representative: {
                    name: 'צה"ל',
                    image: 'inside'
                }
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

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};
