

export class Planner {
    constructor() {
        this.weekDays = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']
        this.planner = {};
        this.weekDays.forEach(day => {
            this.planner[day] = [];
        });
    }

    addEvent(day, event) {
        if (this.weekDays.includes(day)) {
            this.planner[day].push(event);
        } else {
            console.error(`Invalid day: ${day}`);
        }
    }

    removeEvent(day, event) {
        if (this.weekDays.includes(day)) {
            const index = this.planner[day].indexOf(event);
            if (index !== -1) {
                this.planner[day].splice(index, 1);
            } else {
                console.error(`Event not found: ${event}`);
            }
        } else {
            console.error(`Invalid day: ${day}`);
        }
    }

}