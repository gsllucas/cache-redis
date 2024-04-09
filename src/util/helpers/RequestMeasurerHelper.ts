export class MarkTimeFnOptions {
  type: 'start' | 'end';
  date: Date;
}

export class RequestMeasurerHelper {
  private ranges: MarkTimeFnOptions[] = [];
  private measuring = false;

  markTime({ type, date }: MarkTimeFnOptions) {
    if (type === 'end' && !this.measuring) {
      return 'Must provide a start date first';
    }

    this.ranges.push({ type, date });

    if (type === 'end' && this.measuring) {
      const difference = this.getDifference();
      this.cleanRanges();
      this.measuring = false;
      return difference;
    }

    this.measuring = type === 'start';
  }

  private getDifference() {
    if (this.ranges.length <= 1) return 0;
    const start = this.ranges.find((e) => e.type === 'start');
    const end = this.ranges.find((e) => e.type === 'end');
    if (!start || !end) return 0;
    return end.date.getTime() - start.date.getTime();
  }

  private cleanRanges() {
    this.ranges.length = 0;
  }
}
