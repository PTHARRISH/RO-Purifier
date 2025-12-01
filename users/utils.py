from datetime import datetime, timedelta

from django.utils import timezone


def parse_date_range(request):
    now = timezone.now()
    tz = timezone.get_current_timezone()

    period = request.GET.get("period")
    f = request.GET.get("from")
    t = request.GET.get("to")

    if period == "last_week":
        return now - timedelta(days=7), now
    if period == "last_month":
        return now - timedelta(days=30), now
    if period == "last_year":
        return now - timedelta(days=365), now

    if f:
        start = tz.localize(datetime.strptime(f, "%Y-%m-%d"))
    else:
        start = now - timedelta(days=30)

    if t:
        end_date = datetime.strptime(t, "%Y-%m-%d")
        end = tz.localize(
            datetime(end_date.year, end_date.month, end_date.day, 23, 59, 59)
        )
    else:
        end = now

    return start, end


def paginate(request, queryset, page_size_default=25):
    page = int(request.GET.get("page", 1))
    page_size = int(request.GET.get("page_size", page_size_default))

    start = (page - 1) * page_size
    end = start + page_size

    return {
        "page": page,
        "page_size": page_size,
        "total": queryset.count(),
        "results": queryset[start:end],
    }
