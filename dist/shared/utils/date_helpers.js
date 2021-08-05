export function parse_date(value) {
  return typeof value === "string" ? new Date(value.toString()) : value;
}
export function time_ago_in_words(from_date, include_seconds = false) {
  return distance_of_time_in_words(from_date, new Date(), {include_seconds, include_tense: true});
}
const default_options = {
  include_seconds: true,
  include_tense: true
};
export function distance_of_time_in_words(from_date, to_date, options = {}) {
  const full_options = Object.assign({}, default_options, options);
  const from_time = from_date.getTime();
  const to_time = to_date.getTime();
  const diff = to_time - from_time;
  const distance_in_minutes = Math.round(Math.abs(diff) / 6e4);
  const distance_in_seconds = Math.round(Math.abs(diff) / 1e3);
  const tense = full_options.include_tense ? diff > 0 ? " from now" : " ago" : "";
  if (diff === 0) {
    return "no time";
  } else if (0 <= distance_in_minutes && distance_in_minutes <= 1) {
    if (!full_options.include_seconds) {
      if (distance_in_minutes === 0) {
        return "less than 1 minute" + tense;
      } else {
        return "" + distance_in_minutes + " minute" + tense;
      }
    }
    if (distance_in_seconds < 5) {
      return "less than 5 seconds" + tense;
    } else if (distance_in_seconds < 10) {
      return "less than 10 seconds" + tense;
    } else if (distance_in_seconds < 20) {
      return "less than 20 seconds" + tense;
    } else if (distance_in_seconds < 40) {
      return "less than half a minute" + tense;
    } else if (distance_in_seconds < 60) {
      return "less than 1 minute" + tense;
    } else {
      return "1 minute" + tense;
    }
  } else if (distance_in_minutes < 45) {
    return "" + distance_in_minutes + " minutes" + tense;
  } else if (distance_in_minutes < 90) {
    return "about 1 hour" + tense;
  } else if (distance_in_minutes < 1440) {
    return "about " + Math.round(distance_in_minutes / 60) + " hours" + tense;
  } else if (distance_in_minutes < 2530) {
    return "1 day" + tense;
  } else if (distance_in_minutes < 43200) {
    return "" + Math.round(distance_in_minutes / 1440) + " days" + tense;
  } else if (distance_in_minutes < 86400) {
    return "about 1 month" + tense;
  } else if (distance_in_minutes < 525600) {
    return "" + Math.round(distance_in_minutes / 43200) + " months" + tense;
  } else {
    const distance_in_years = distance_in_minutes / 525600;
    const minute_offset_for_leap_year = distance_in_years / 4 * 1440;
    const remainder = (distance_in_minutes - minute_offset_for_leap_year) % 525600;
    if (remainder < 131400) {
      return "about " + Math.round(distance_in_years) + " years" + tense;
    } else if (remainder < 394200) {
      return "over " + Math.round(distance_in_years) + " years" + tense;
    } else {
      return "almost " + Math.round(distance_in_years + 1) + " years" + tense;
    }
  }
}
function round_to_nearest(value, rounding_to_nearest) {
  let rounded_value = rounding_to_nearest * Math.round(value / rounding_to_nearest);
  if (rounded_value === 0) {
    return 0;
  }
  return parseInt(rounded_value.toFixed(), 10);
}
export function distance_of_time_in_hms(from_date, to_date) {
  const from_time = from_date.getTime();
  const to_time = to_date.getTime();
  const A_MINUTE = 60;
  const A_HOUR = 3600;
  const A_DAY = 86400;
  const DAYS_PER_MONTH = 30;
  const A_MONTH = A_DAY * DAYS_PER_MONTH;
  const A_YEAR = A_MONTH * 12;
  const diff = Math.abs(to_time - from_time) / 1e3;
  const seconds = Math.floor(diff);
  const minutes = Math.floor(diff / A_MINUTE);
  const hours = Math.floor(diff / A_HOUR);
  const days = Math.floor(diff / A_DAY);
  const months = Math.floor(diff / A_MONTH);
  const years = Math.floor(diff / A_YEAR);
  function formatter(round_s) {
    let extra_minute = 0;
    let extra_hour = 0;
    let extra_day = 0;
    let extra_month = 0;
    let extra_year = 0;
    let rounded_seconds = round_to_nearest(seconds % 60, round_s);
    if (rounded_seconds === 60) {
      rounded_seconds = 0;
      extra_minute = 1;
    }
    let rounded_minutes = round_to_nearest(minutes % 60 + extra_minute, round_s / A_MINUTE);
    if (rounded_minutes === 60) {
      rounded_minutes = 0;
      extra_hour = 1;
    }
    let rounded_hours = round_to_nearest(hours % 24 + extra_hour, round_s / A_HOUR);
    if (rounded_hours === 24) {
      rounded_hours = 0;
      extra_day = 1;
    }
    let rounded_days = round_to_nearest(days % DAYS_PER_MONTH + extra_day, round_s / A_DAY);
    if (rounded_days === DAYS_PER_MONTH) {
      rounded_days = 0;
      extra_month = 1;
    }
    let rounded_months = round_to_nearest(months % 12 + extra_month, round_s / A_MONTH);
    if (rounded_months === 12) {
      rounded_months = 0;
      extra_year = 1;
    }
    let rounded_years = round_to_nearest(years % 30 + extra_year, round_s / A_YEAR);
    let output = [];
    if (rounded_years) {
      output.push(`${rounded_years}yr`);
    }
    if (rounded_months) {
      output.push(`${rounded_months}mth`);
    }
    if (rounded_days && output.length < 2) {
      output.push(`${rounded_days}dy`);
    }
    if (rounded_hours && output.length < 2) {
      output.push(`${rounded_hours}h`);
    }
    if (rounded_minutes && output.length < 2) {
      output.push(`${rounded_minutes}m`);
    }
    if (rounded_seconds && output.length < 2) {
      output.push(`${rounded_seconds}s`);
    }
    if (!output.length) {
      output.push("0s");
    }
    return output.join(" ");
  }
  if (seconds < 30) {
    return formatter(1);
  } else if (minutes < 1) {
    return formatter(5);
  } else if (minutes < 5) {
    return formatter(10);
  } else if (minutes < 20) {
    return formatter(30);
  } else if (hours < 1) {
    return formatter(60 * 5);
  } else if (hours < 12) {
    return formatter(60 * 15);
  } else if (days < 1) {
    return formatter(3600);
  } else if (days < 5) {
    return formatter(3600 * 4);
  } else if (days < 20) {
    return formatter(3600 * 12);
  } else if (months < 2) {
    return formatter(3600 * 24);
  } else if (months < 6) {
    return formatter(3600 * 24 * 7);
  } else {
    return formatter(3600 * 24 * 15);
  }
}
export function date2str(date, format) {
  const z = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  format = format.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
    return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2);
  });
  return format.replace(/(y+)/g, function(v) {
    return date.getFullYear().toString().slice(-v.length);
  });
}
export function date2str_auto(args) {
  const {date, time_resolution = "minute", trim_midnight = true} = args;
  const format = time_resolution === "day" ? "yyyy-MM-dd" : time_resolution === "hour" ? "yyyy-MM-dd hh:00" : "yyyy-MM-dd hh:mm";
  const datetime_string = date2str(date, format);
  return trim_midnight ? datetime_string.replace(" 00:00", "") : datetime_string;
}
export function get_today_str(include_hours = true) {
  return date2str(new Date(), "yyyy-MM-dd") + (include_hours ? " 00:00" : "");
}
export function get_today_date() {
  return new Date(get_today_str());
}
