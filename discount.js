import {
  forwardRef as Z,
  Suspense as Oe,
  useCallback as K,
  useEffect as ie,
  useId as $o,
  useImperativeHandle as ma,
  useMemo as me,
  useRef as de,
  useState as q,
} from "react";
import {
  useSuspenseQueries as Ad,
  useSuspenseQuery as st,
} from "@tanstack/react-query";
import {
  createFileRoute as Et,
  useNavigate as an,
} from "@tanstack/react-router";

function QGu() {
  const e = QNe(),
    t = Hhr(),
    [{ data: n }, { data: r }] = Ad({
      queries: [Ig.promotionEnabled, Ig.promotionTermsAgreed],
    }),
    { mutateAsync: i } = l3t(),
    o = ht();
  return a(W, {
    screen: {
      schemaId: Wt.할인관리,
    },
    children: y(St, {
      children: [
        a(St.Header, {
          title: "할인",
          rightAddon: a(W, {
            click: {
              schemaId: Wt.할인관리_추가_버튼_클릭,
            },
            children: a(he, {
              type: "primary",
              size: "medium",
              onClick: () => {
                t({
                  mode: "create",
                });
              },
              className: u0,
              children: "+ 할인 추가",
            }),
          }),
        }),
        a(St.Content, {
          children: a(H, {
            direction: "column",
            align: "stretch",
            children: y(vo, {
              css: mt({
                top: 8,
                left: -24,
                bottom: 26,
              }),
              children: [
                a(ue, {
                  contents: a(ue.Texts, {
                    type: "2RowTypeA",
                    top: "사장님 비용없이 할인해주기",
                    topProps: {
                      color: M.grey800,
                      fontWeight: "bold",
                    },
                    bottom: "토스 지원 할인·이벤트",
                    bottomProps: {
                      color: M.grey600,
                    },
                  }),
                  right: a(W, {
                    click: {
                      schemaId: Wt.토스지원_할인받기_토글_클릭,
                    },
                    params: {
                      activeYn: n ? "N" : "Y",
                    },
                    children: a(ts, {
                      checked: n,
                      onChange: ({ target: { checked: s } }) => {
                        if (s === !1) {
                          i(!1);
                          o.open({
                            message: "토스가 내는 할인을 껐어요",
                            position: "top",
                            icon: "icn-success-color",
                          });
                          return;
                        }
                        if (r) {
                          i(!0);
                          o.open({
                            message: "이벤트가 열리면 알려드려요",
                            position: "top",
                            icon: "icn-success-color",
                          });
                          return;
                        }
                        yn.openAsync(({ isOpen: u, close: l, unmount: c }) =>
                          a($Ve, {
                            open: u,
                            onClose: l,
                            onExited: c,
                            onAgree: () => {
                              ye.log(
                                Wt.토스지원_할인받기_동의_완료_토스트_임프레션,
                              );
                            },
                          }),
                        );
                      },
                    }),
                  }),
                  verticalPadding: "medium",
                }),
                e.map((s) =>
                  a(
                    W,
                    {
                      click: {
                        schemaId: Wt.할인관리_할인_선택,
                      },
                      params: {
                        discountName: s.title,
                        discountType: s.type,
                        discount:
                          s.percentage > 0 ? s.percentage / 100 : s.amountMoney,
                      },
                      children: a(ue, {
                        contents: a(ue.Texts, {
                          type: "1RowTypeB",
                          top: s.title,
                          topProps: {
                            color: M.grey800,
                          },
                        }),
                        right: a(ue.Texts, {
                          type: "Right1RowTypeA",
                          top: XGu(s),
                          topProps: {
                            color: M.grey600,
                          },
                        }),
                        verticalPadding: "medium",
                        leftAlignment: "center",
                        rightAlignment: "center",
                        withArrow: !1,
                        onClick: async () => {
                          await t({
                            mode: "edit",
                            discount: s,
                          });
                        },
                      }),
                    },
                    s.id,
                  ),
                ),
              ],
            }),
          }),
        }),
      ],
    }),
  });
}
const ZGu = Et("/main/catalogs/settings/_catalog-settings/discounts")({
    component: QGu,
  }),
  JGu = Et("/main/catalogs/settings/_catalog-settings/categories")({
    component: Mze,
  });

const Bs = {
    할인_등록수정_다이얼로그: 1247681,
    할인_등록수정_할인유형_선택: 1247683,
    할인_등록수정_취소_클릭: 1247685,
    할인_등록수정_확인_클릭: 1247687,
    할인_등록수정_삭제_클릭: 1249067,
    할인_등록수정_자동할인_토글: 1266749,
    할인_등록수정_자동할인_항목_클릭: 1266751,
    할인_등록수정_자동할인_수정_클릭: 1266771,
    할인_등록수정_자동할인_추가_클릭: 1266773,
    할인_등록수정_조건없이확인_팝업: 1266747,
    할인_등록수정_조건없이확인_팝업_적용_클릭: 1266753,
    할인_등록수정_조건없이확인_팝업_다시보기_클릭: 1266755,
    할인할_상품선택_다이얼로그: 1266763,
    할인할_상품선택_저장_클릭: 1266765,
    할인할_상품선택_닫기_클릭: 1266767,
    할인할_상품선택_전체선택_클릭: 1266769,
    할인할_시간대_다이얼로그: 1266815,
    할인할_시간대_닫기_클릭: 1266825,
    할인할_시간대_저장_클릭: 1266821,
    할인할_시간대_시간대설정_토글: 1266817,
    할인할_시간대_기간설정_토글: 1266819,
    할인적용_조건맞지않음_팝업: 1267135,
    할인적용_조건맞지않음_팝업_적용_클릭: 1267137,
    할인적용_조건맞지않음_팝업_취소_클릭: 1267139,
    할인적용_할인유형_선택: 1233955,
    할인적용_할인_선택: 1233957,
    할인적용_확인_클릭: 1233959,
    할인적용_새할인_추가_버튼_클릭: 1247679,
    할인적용_수정_버튼_클릭: 1267131,
    할인적용_취소_버튼_클릭: 1267133,
    주문_페이지_탭_클릭: 1348617,
  },
  ABs = ve.object({
    dayOfWeeks: ve
      .array(
        ve.enum([
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      )
      .min(1)
      .nullable(),
    timeRange: ve
      .object({
        start: ve.string(),
        end: ve.string(),
      })
      .nullable(),
    dateRange: ve
      .object({
        start: ve.string(),
        end: ve.string(),
      })
      .nullable(),
  });

function EBs({ defaultValues: e, onSubmit: t, onBack: n, onClose: r }) {
  const i = $o(),
    o = yi({
      defaultValues: e ?? {
        dayOfWeeks: null,
        timeRange: null,
        dateRange: null,
      },
      mode: "onChange",
      resolver: pre(ABs),
    }),
    {
      handleSubmit: s,
      formState: { isValid: u, isDirty: l },
    } = o,
    c = (d) => {
      var h, p, f, g;
      (ye.log(Bs.할인할_시간대_저장_클릭, {
        dayOfWeeks: d.dayOfWeeks,
        timeRangeStart: (h = d.timeRange) == null ? void 0 : h.start,
        timeRangeEnd: (p = d.timeRange) == null ? void 0 : p.end,
        dateRangeStart: (f = d.dateRange) == null ? void 0 : f.start,
        dateRangeEnd: (g = d.dateRange) == null ? void 0 : g.end,
      }),
        t(d));
    };
  return a(W, {
    screen: {
      schemaId: Bs.할인할_시간대_다이얼로그,
    },
    children: y(co, {
      ...o,
      children: [
        a(xe.Title, {
          css: {
            display: "flex",
            justifyContent: "space-between",
            flex: "none",
            padding: "40px 70px 20px 40px",
          },
          children: y(I.Horizontal, {
            gutter: 20,
            align: "center",
            children: [
              a("button", {
                type: "button",
                "aria-label": "뒤로가기",
                css: Rn,
                onClick: n,
                children: a(xn, {
                  name: "icon-arrow-back-ios-mono",
                  size: 28,
                  color: _.grey600,
                }),
              }),
              a(ne, {
                typography: "h6",
                fontWeight: "semibold",
                color: _.grey800,
                children: "할인 시간대 ・ 기간",
              }),
            ],
          }),
        }),
        a(xe.Scrollable, {
          css: {
            padding: "0 50px",
          },
          children: y(I.Vertical, {
            id: i,
            as: "form",
            onSubmit: s(c),
            align: "stretch",
            gutter: 60,
            children: [a(BBs, {}), a(FBs, {}), a($Bs, {})],
          }),
        }),
        a(xe.BottomActions, {
          css: {
            height: 106,
            padding: "22px 90px",
          },
          children: y(I.Horizontal, {
            justify: "flex-end",
            gutter: 12,
            css: $e,
            children: [
              a(W, {
                click: {
                  schemaId: Bs.할인할_시간대_닫기_클릭,
                },
                children: a(Ye, {
                  htmlType: "button",
                  type: "default",
                  size: "xlarge",
                  onClick: r,
                  children: "취소",
                }),
              }),
              a(Ye, {
                form: i,
                htmlType: "submit",
                type: "primary",
                size: "xlarge",
                disabled: !u || !l,
                css: {
                  minWidth: 160,
                },
                children: "저장",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
const DBs = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  },
  TBs = pw(DBs).map(([e, t]) => ({
    name: t,
    value: e,
  }));

function BBs() {
  const { control: e } = ot();
  return y(I.Vertical, {
    gutter: 20,
    children: [
      a(ne, {
        typography: "h7",
        color: _.grey800,
        children: "요일",
      }),
      a(Tt, {
        name: "dayOfWeeks",
        control: e,
        render: ({ field: { value: t, onChange: n } }) => {
          const r = t ?? [];
          return a(I.Horizontal, {
            gutter: 8,
            children: TBs.map((i) => {
              const o = r.includes(i.value);
              return a(
                he,
                {
                  htmlType: "button",
                  size: "large",
                  style: o ? void 0 : "weak",
                  type: "dark",
                  onClick: () => {
                    const u = o
                      ? r.filter((l) => l !== i.value)
                      : [...r, i.value];
                    n(u.length === 0 ? null : u);
                  },
                  css: {
                    flex: 1,
                    maxWidth: 70,
                  },
                  children: i.name,
                },
                i.value,
              );
            }),
          });
        },
      }),
    ],
  });
}
const SBs = L0(24)
    .map((e) => e * 60 * 60)
    .map((e) => {
      const t = wwt(e);
      return {
        name: gSe(t, "start"),
        value: t,
      };
    }),
  Fin = 24 * 60 * 60;

function kBs(e) {
  const t = L0(1, 25).map((r) => r * 60 * 60 - 1),
    n = e != null ? vJ(e) : -1;
  return (
    t.sort((r, i) => {
      const o = r < n ? r + Fin : r,
        s = i < n ? i + Fin : i;
      return o - s;
    }),
    t.map((r) => {
      const i = wwt(r),
        o = gSe(i, "end");
      return {
        name: r < n ? `다음날 ${o}` : o,
        value: i,
      };
    })
  );
}

function FBs() {
  const { control: e, setValue: t } = ot(),
    n =
      eh({
        name: "timeRange",
        control: e,
      }) != null;
  return y(I.Vertical, {
    align: "stretch",
    gutter: 20,
    children: [
      y(H.CenterVertical, {
        justify: "space-between",
        children: [
          a(ne, {
            typography: "h7",
            color: _.grey800,
            children: "시간대 설정",
          }),
          a(Ni, {
            capture: "onChange",
            schemaId: Bs.할인할_시간대_시간대설정_토글,
            params: (r) => ({
              activeYn: r.target.checked,
            }),
            children: a(ZC, {
              checked: n,
              size: "medium",
              onChange: (r) => {
                const i = r.target.checked;
                t(
                  "timeRange",
                  i
                    ? {
                        start: void 0,
                        end: void 0,
                      }
                    : null,
                  {
                    shouldValidate: !0,
                    shouldDirty: !0,
                  },
                );
              },
            }),
          }),
        ],
      }),
      n
        ? a(I.Horizontal, {
            align: "stretch",
            gutter: 18,
            children: a(Tt, {
              name: "timeRange",
              control: e,
              render: ({ field: { value: r, onChange: i } }) => {
                const o = r == null ? void 0 : r.start,
                  s = r == null ? void 0 : r.end;
                return y(Q, {
                  children: [
                    a(Me, {
                      css: {
                        flex: 1,
                      },
                      children: a(Yi, {
                        value: o,
                        onChange: (u) =>
                          i({
                            ...r,
                            start: u,
                          }),
                        placeholder: "선택",
                        align: "justify",
                        leftAddon: a(Me.Txt, {
                          children: "시작",
                        }),
                        children: SBs.map((u) =>
                          a(
                            Yi.Option,
                            {
                              value: u.value,
                              children: u.name,
                            },
                            u.value,
                          ),
                        ),
                      }),
                    }),
                    a(ne, {
                      typography: "h5",
                      color: _.grey800,
                      fontWeight: "medium",
                      children: "~",
                    }),
                    a(Me, {
                      css: {
                        flex: 1,
                      },
                      children: a(Yi, {
                        value: s,
                        onChange: (u) =>
                          i({
                            ...r,
                            end: u,
                          }),
                        placeholder: "선택",
                        align: "justify",
                        leftAddon: a(Me.Txt, {
                          children: "종료",
                        }),
                        children: kBs(o).map((u) =>
                          a(
                            Yi.Option,
                            {
                              value: u.value,
                              children: u.name,
                            },
                            u.value,
                          ),
                        ),
                      }),
                    }),
                  ],
                });
              },
            }),
          })
        : null,
    ],
  });
}

function $Bs() {
  const { control: e, setValue: t } = ot(),
    n =
      eh({
        name: "dateRange",
        control: e,
      }) != null;
  return y(I.Vertical, {
    align: "stretch",
    gutter: 20,
    children: [
      y(H.CenterVertical, {
        justify: "space-between",
        children: [
          a(ne, {
            typography: "h7",
            color: _.grey800,
            children: "기간 설정",
          }),
          a(Ni, {
            capture: "onChange",
            schemaId: Bs.할인할_시간대_기간설정_토글,
            params: (r) => ({
              activeYn: r.target.checked,
            }),
            children: a(ZC, {
              checked: n,
              size: "medium",
              onChange: (r) => {
                const i = r.target.checked;
                t(
                  "dateRange",
                  i
                    ? {
                        start: void 0,
                        end: void 0,
                      }
                    : null,
                  {
                    shouldDirty: !0,
                    shouldValidate: !0,
                  },
                );
              },
            }),
          }),
        ],
      }),
      n
        ? a(I.Horizontal, {
            gutter: 18,
            children: a(Tt, {
              name: "dateRange",
              control: e,
              render: ({ field: { value: r, onChange: i } }) => {
                const o =
                    (r == null ? void 0 : r.start) != null
                      ? new Date(r.start)
                      : null,
                  s =
                    (r == null ? void 0 : r.end) != null
                      ? new Date(r.end)
                      : null;
                return y(Q, {
                  children: [
                    a(H, {
                      direction: "column",
                      align: "stretch",
                      css: {
                        flex: 1,
                      },
                      children: a(Iin, {
                        label: "시작",
                        value: o,
                        onChange: (u) =>
                          i({
                            ...r,
                            start: $in(u) ? Ue(u, "yyyy-MM-dd") : null,
                          }),
                        shouldDisableDate: (u) =>
                          s != null ? Of(u, s) > 0 : !1,
                      }),
                    }),
                    a(ne, {
                      typography: "h5",
                      color: _.grey800,
                      fontWeight: "medium",
                      children: "~",
                    }),
                    a(H, {
                      direction: "column",
                      align: "stretch",
                      css: {
                        flex: 1,
                      },
                      children: a(Iin, {
                        label: "종료",
                        value: s,
                        onChange: (u) =>
                          i({
                            ...r,
                            end: $in(u) ? Ue(u, "yyyy-MM-dd") : null,
                          }),
                        shouldDisableDate: (u) =>
                          o != null ? Of(u, o) < 0 : !1,
                      }),
                    }),
                  ],
                });
              },
            }),
          })
        : null,
    ],
  });
}
const $in = (e) => e != null && Pyt(e);

function Iin({ label: e, value: t, shouldDisableDate: n, onChange: r }) {
  return y(gp, {
    fixedWidth: !1,
    value: t,
    children: [
      a(gp.Trigger, {
        children: a(gp.FieldBox, {
          leftAddon: a(Me.Txt, {
            children: e,
          }),
          placeholder: "선택",
          children: a(gp.DateInput, {
            children: a(gp.MonthInput, {
              placeholder: "선택",
              format: "yyyy. MM. dd",
            }),
          }),
        }),
      }),
      a(gp.Content, {
        topAddon: a(gp.Head, {
          rightAddon: a(gp.DateControls, {}),
          children: a(gp.ActiveDate, {}),
        }),
        zIndex: 150,
        children: a(gp.Calendar, {
          shouldDisableDate: n,
          onCalendarChange: r,
        }),
      }),
    ],
  });
}

function Pin() {
  return yt.invalidateQueries({
    queryKey: W8t.discounts,
  });
}
async function IBs(e) {
  return await Se.post("/api/pos/v1/discounts", {
    json: e,
  });
}
async function PBs(e) {
  await Se.delete(`/api/pos/v1/discounts/${e}`);
}
async function OBs(e, t) {
  return await Se.put(`/api/pos/v1/discounts/${e}`, {
    json: t,
  });
}

function R4t({ number: e, title: t, children: n, className: r }) {
  return y(H, {
    align: "center",
    justify: "space-between",
    css: {
      height: 50,
    },
    className: r,
    children: [
      y(I.Horizontal, {
        align: "center",
        gutter: 15,
        children: [
          a(Qt, {
            shape: gt.CleanW24,
            backgroundColor: "transparent",
            content: a(Hn, {
              name: `icon-step${e}-off`,
            }),
          }),
          a(ne, {
            typography: "h7",
            color: _.grey700,
            children: t,
          }),
        ],
      }),
      n,
    ],
  });
}
const Oin = "auto-apply-schedule";

function RBs({ onScheduleSetting: e }) {
  const { control: t, setValue: n } = ot(),
    i =
      eh({
        name: "autoApply.condition.schedule",
        control: t,
      }) != null;
  return y(Q, {
    children: [
      a(R4t, {
        number: 3,
        title: "할인 시간대 ・ 기간",
        children: y(H.CenterVertical, {
          children: [
            a(ta, {
              name: Oin,
              label: "항상",
              checked: !i,
              inline: !0,
              onChange: (o) => {
                o.target.checked &&
                  n("autoApply.condition.schedule", null, {
                    shouldValidate: !0,
                    shouldDirty: !0,
                  });
              },
            }),
            a(ta, {
              name: Oin,
              label: "설정",
              checked: i,
              inline: !0,
              onChange: (o) => {
                i || (o.preventDefault(), o.stopPropagation(), e());
              },
            }),
          ],
        }),
      }),
      i &&
        a(H, {
          css: {
            padding: "8px 0 24px 39px",
          },
          children: a(MBs, {
            onScheduleSetting: e,
          }),
        }),
    ],
  });
}

function MBs({ onScheduleSetting: e }) {
  var c, d;
  const {
      control: t,
      setValue: n,
      formState: { errors: r },
    } = ot(),
    i = eh({
      name: "autoApply.condition.schedule",
      control: t,
    });
  if (i == null) return null;
  if (i.dayOfWeeks == null && i.timeRange == null && i.dateRange == null)
    return a(W, {
      click: {
        schemaId: Bs.할인_등록수정_자동할인_추가_클릭,
      },
      params: {
        type: "할인 시간대 기간",
      },
      children: a(cc, {
        variant: "weak",
        type:
          ((d = (c = r.autoApply) == null ? void 0 : c.condition) == null
            ? void 0
            : d.schedule) != null
            ? "danger"
            : "primary",
        display: "block",
        rightAddon: a(cc.Icon, {
          name: "icon-plus-mono",
        }),
        onClick: e,
        children: "시간대 ・ 기간 추가",
      }),
    });
  const s =
      i.dateRange != null
        ? "dateRange"
        : i.timeRange != null
          ? "timeRange"
          : "dayOfWeeks",
    u = {
      shouldValidate: !0,
      shouldDirty: !0,
    },
    l = a(W, {
      click: {
        schemaId: Bs.할인_등록수정_자동할인_수정_클릭,
      },
      params: {
        type: "할인 시간대 기간",
      },
      children: a(W_.EditButton, {
        onClick: e,
      }),
    });
  return y(I.Vertical, {
    align: "stretch",
    gutter: 20,
    children: [
      i.dayOfWeeks != null
        ? y(W_, {
            title: "요일",
            children: [
              a(W_.Item, {
                onDelete: () => {
                  n("autoApply.condition.schedule.dayOfWeeks", null, u);
                },
                children: $So(i.dayOfWeeks).map(kSo).join(", "),
              }),
              s === "dayOfWeeks" ? l : null,
            ],
          })
        : null,
      i.timeRange != null
        ? y(W_, {
            title: "시간대",
            children: [
              a(W_.Item, {
                onDelete: () => {
                  n("autoApply.condition.schedule.timeRange", null, u);
                },
                children: FSo(i.timeRange),
              }),
              s === "timeRange" ? l : null,
            ],
          })
        : null,
      i.dateRange != null
        ? y(W_, {
            title: "기간",
            children: [
              y(W_.Item, {
                onDelete: () => {
                  n("autoApply.condition.schedule.dateRange", null, u);
                },
                children: [i.dateRange.start, " ~ ", i.dateRange.end],
              }),
              s === "dateRange" ? l : null,
            ],
          })
        : null,
    ],
  });
}
const M4t = ["HERE", "TOGO", "DELIVERY", "PICKUP"],
  Rin = "auto-apply-dining-options";

function LBs() {
  const { control: e } = ot();
  return a(R4t, {
    number: 1,
    title: "주문 타입 (매장/포장)",
    children: a(H.CenterVertical, {
      children: a(Tt, {
        control: e,
        name: "autoApply.condition.diningOptions",
        render: ({ field: { value: t, onChange: n } }) => {
          const r = t.length === 1 && t[0] === "TOGO";
          return y(Q, {
            children: [
              a(Ni, {
                capture: "onChange",
                schemaId: Bs.할인_등록수정_자동할인_항목_클릭,
                params: {
                  diningOption: "전체",
                },
                children: a(ta, {
                  name: Rin,
                  label: "전체",
                  checked: !r,
                  inline: !0,
                  onChange: (i) => {
                    i.target.checked && n(M4t);
                  },
                }),
              }),
              a(Ni, {
                capture: "onChange",
                schemaId: Bs.할인_등록수정_자동할인_항목_클릭,
                params: {
                  diningOption: "포장",
                },
                children: a(ta, {
                  name: Rin,
                  label: "포장",
                  checked: r,
                  inline: !0,
                  onChange: (i) => {
                    i.target.checked && n(["TOGO"]);
                  },
                }),
              }),
            ],
          });
        },
      }),
    }),
  });
}

function NBs() {
  const { register: e, watch: t } = ot(),
    n = t("title"),
    r = t("autoApply") != null;
  return y(Q, {
    children: [
      y(I.Vertical, {
        gutter: 1,
        children: [
          a(ne, {
            typography: "h7",
            color: _.grey700,
            fontWeight: "medium",
            children: "자동 할인 영어이름 표기",
          }),
          a(ne, {
            typography: "small",
            color: _.grey600,
            children: "키오스크에서 English를 누르면 보이는 할인 이름이에요.",
          }),
        ],
      }),
      a(ce, {
        size: 20,
      }),
      a(Me, {
        label: n ?? "할인이름",
        children: a(Me.TextField, {
          disabled: !r,
          ...e("titleI18n.languages.en-US"),
          placeholder: "영어로 작성해 주세요",
        }),
      }),
    ],
  });
}

function VBs() {
  const { watch: e, setValue: t } = ot(),
    n = e("autoApply") != null;
  return y(H, {
    align: "center",
    justify: "space-between",
    children: [
      y(I.Vertical, {
        gutter: 1,
        children: [
          a(ne, {
            typography: "h7",
            color: _.grey800,
            fontWeight: "semibold",
            children: "자동으로 할인 적용하기",
          }),
          a(ne, {
            typography: "small",
            color: _.grey500,
            children: "3가지 조건에 맞춰 자동으로 적용되어요",
          }),
        ],
      }),
      a(Ni, {
        capture: "onChange",
        schemaId: Bs.할인_등록수정_자동할인_토글,
        params: (r) => ({
          autoYn: r.target.checked,
        }),
        children: a(ZC, {
          checked: n,
          onChange: (r) => {
            const i = r.target.checked,
              o = {
                shouldDirty: !0,
                shouldValidate: !0,
              };
            i
              ? t(
                  "autoApply",
                  {
                    condition: {
                      appliedToAll: !0,
                      diningOptions: M4t,
                      schedule: null,
                    },
                    targets: [],
                  },
                  o,
                )
              : t("autoApply", void 0, o);
          },
        }),
      }),
    ],
  });
}
const Min = "auto-apply-items";

function zBs({ onItemsSelect: e }) {
  const { control: t, watch: n } = ot(),
    r = n("autoApply.condition.appliedToAll") === !1;
  return y(Q, {
    children: [
      a(R4t, {
        number: 2,
        title: "할인 상품",
        children: a(H.CenterVertical, {
          children: a(Tt, {
            control: t,
            name: "autoApply.condition.appliedToAll",
            render: ({ field: { value: i, onChange: o } }) =>
              y(Q, {
                children: [
                  a(Ni, {
                    capture: "onChange",
                    schemaId: Bs.할인_등록수정_자동할인_항목_클릭,
                    params: {
                      appliedTo: "전체",
                    },
                    children: a(ta, {
                      name: Min,
                      label: "전체",
                      checked: i,
                      inline: !0,
                      onChange: (s) => {
                        s.target.checked && o(!0);
                      },
                    }),
                  }),
                  a(Ni, {
                    capture: "onChange",
                    schemaId: Bs.할인_등록수정_자동할인_항목_클릭,
                    params: {
                      appliedTo: "선택",
                    },
                    children: a(ta, {
                      name: Min,
                      label: "선택",
                      checked: !i,
                      inline: !0,
                      onChange: (s) => {
                        if (i) {
                          (s.preventDefault(), s.stopPropagation(), e());
                          return;
                        }
                      },
                    }),
                  }),
                ],
              }),
          }),
        }),
      }),
      r
        ? a(Oe, {
            children: a(WBs, {
              onItemsSelect: e,
            }),
          })
        : null,
    ],
  });
}

function WBs({ onItemsSelect: e }) {
  const { control: t } = ot(),
    n = p0(),
    r = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1,
    }).map((i) => i.catalogItem);
  return a(Tt, {
    control: t,
    name: "autoApply.targets",
    render: ({ field: { value: i = [], onChange: o }, fieldState: s }) =>
      a(X4.ForCatalog, {
        targets: i,
        categories: n,
        items: r,
        onChange: o,
        onEdit: () => {
          (ye.log(Bs.할인_등록수정_자동할인_수정_클릭, {
            type: "할인 상품",
          }),
            e());
        },
        empty: a(H, {
          css: {
            padding: "8px 0 24px 39px",
          },
          children: a(W, {
            click: {
              schemaId: Bs.할인_등록수정_자동할인_추가_클릭,
            },
            params: {
              type: "할인 상품",
            },
            children: a(Ye, {
              variant: "weak",
              type: s.error != null ? "danger" : "primary",
              display: "block",
              rightAddon: a(Ye.Icon, {
                name: "icon-plus-mono",
              }),
              onClick: e,
              children: "상품 추가",
            }),
          }),
        }),
        css: {
          padding: "8px 0 24px 39px",
        },
      }),
  });
}

function UBs({ onItemsSelect: e, onScheduleSetting: t, className: n }) {
  const { watch: r } = ot(),
    i = r("autoApply") != null;
  return y("div", {
    className: n,
    children: [
      a(VBs, {}),
      i
        ? y(I.Vertical, {
            align: "stretch",
            css: {
              marginTop: 24,
              padding: "12px 0",
              borderTop: `1px solid ${_.grey100}`,
            },
            children: [
              a(LBs, {}),
              a(zBs, {
                onItemsSelect: e,
              }),
              a(RBs, {
                onScheduleSetting: t,
              }),
            ],
          })
        : null,
      a(ce, {
        size: 52,
      }),
      a(NBs, {}),
    ],
  });
}

function HBs(e) {
  const { control: t, watch: n } = ot(),
    r = n("type") === "FIXED_PERCENTAGE";
  return a(Me, {
    label: "할인금액",
    ...e,
    children: a(Tt, {
      control: t,
      name: "value",
      rules: {
        required: !0,
      },
      render: ({ field: { value: i = 0, onChange: o, onBlur: s } }) =>
        a(Me.TextField, {
          value: fe(i),
          onChange: (u) => {
            o(Number(ga(u.target.value)));
          },
          rightAddon: a(ne, {
            typography: "p",
            children: r ? "%" : "원",
          }),
          placeholder: "0",
          onBlur: s,
        }),
    }),
  });
}

function jBs(e) {
  const { register: t } = ot();
  return a(Me, {
    label: "할인이름",
    required: !0,
    ...e,
    children: a(Me.TextField, {
      ...t("title", {
        required: !0,
      }),
      placeholder: "할인이름",
    }),
  });
}
const GBs = [
  {
    name: "원",
    value: "FIXED_AMOUNT",
  },
  {
    name: "%",
    value: "FIXED_PERCENTAGE",
  },
];

function qBs() {
  const { control: e } = ot();
  return a(I.Horizontal, {
    gutter: 6,
    align: "stretch",
    css: {
      height: 48,
    },
    children: a(Tt, {
      control: e,
      name: "type",
      rules: {
        required: !0,
      },
      render: ({ field: { value: t, onChange: n } }) =>
        a(Q, {
          children: GBs.map((r) => {
            const i = r.value === t;
            return a(
              W,
              {
                click: {
                  schemaId: Bs.할인_등록수정_할인유형_선택,
                },
                params: {
                  discountType: t,
                },
                children: a(he, {
                  "aria-selected": i,
                  style: i ? "fill" : "weak",
                  type: "dark",
                  size: "medium",
                  htmlType: "button",
                  onClick: () => n(r.value),
                  children: r.name,
                }),
              },
              r.value,
            );
          }),
        }),
    }),
  });
}

function YBs({
  title: e,
  isDeleteAvailable: t = !1,
  onClose: n,
  onItemsSelect: r,
  onScheduleSetting: i,
  onSubmit: o,
  onDelete: s,
}) {
  const u = $o(),
    { formState: l, handleSubmit: c } = ot();
  return y(Q, {
    children: [
      a(xe.CloseButton, {}),
      a(xe.Title, {
        css: {
          flex: "none",
          padding: "40px 70px 20px",
        },
        children: a(ne, {
          typography: "h6",
          fontWeight: "semibold",
          color: _.grey800,
          children: e,
        }),
      }),
      y("form", {
        id: u,
        onSubmit: c(o),
        css: {
          position: "relative",
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        },
        children: [
          y(xe.Scrollable, {
            innerPadding: {
              bottom: 0,
            },
            css: {
              padding: "0 25px 0 70px",
              flex: 1,
            },
            children: [
              y(I.Vertical, {
                align: "stretch",
                gutter: 24,
                children: [
                  a(jBs, {}),
                  y(I.Horizontal, {
                    align: "flex-end",
                    gutter: 10,
                    children: [
                      a(HBs, {
                        css: {
                          flex: 1,
                        },
                      }),
                      a(qBs, {}),
                    ],
                  }),
                ],
              }),
              a(UBs, {
                onItemsSelect: r,
                onScheduleSetting: i,
                css: {
                  marginTop: 52,
                },
              }),
            ],
          }),
          y(xe.BottomActions, {
            css: {
              height: 106,
              padding: "22px 90px",
            },
            children: [
              t
                ? a(Ye, {
                    type: "danger",
                    size: "xlarge",
                    onClick: s,
                    children: "삭제",
                  })
                : null,
              y(I.Horizontal, {
                justify: "flex-end",
                gutter: 12,
                css: {
                  flex: 1,
                },
                children: [
                  a(W, {
                    click: {
                      schemaId: Bs.할인_등록수정_취소_클릭,
                    },
                    children: a(Ye, {
                      htmlType: "button",
                      type: "default",
                      size: "xlarge",
                      onClick: n,
                      children: "취소",
                    }),
                  }),
                  a(Ye, {
                    htmlType: "submit",
                    type: "primary",
                    size: "xlarge",
                    form: u,
                    css: {
                      minWidth: 160,
                    },
                    disabled: !l.isValid,
                    loading: l.isSubmitting,
                    children: "확인",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function KBs({ onBack: e, onClose: t }) {
  const n = p0(),
    r = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1,
    }).map((h) => h.catalogItem),
    { setValue: i, watch: o } = ot(),
    [s, u] = q(
      fG(
        o("autoApply.targets"),
        {
          targetType: "CATEGORY",
          items: n,
        },
        {
          targetType: "ITEM",
          items: r,
          predicateParent: (h, p) => h.category.id === p.id,
        },
      ),
    ),
    l = $Ce(
      s,
      {
        targetType: "CATEGORY",
      },
      {
        targetType: "ITEM",
      },
    ),
    c = qLe(s),
    d = (h) => {
      u(YLe(s, h));
    };
  return y(W, {
    screen: {
      schemaId: Bs.할인할_상품선택_다이얼로그,
    },
    children: [
      y(xe.Title, {
        css: {
          display: "flex",
          justifyContent: "space-between",
          flex: "none",
          padding: "40px 70px 20px 40px",
        },
        children: [
          y(I.Horizontal, {
            gutter: 20,
            align: "center",
            children: [
              a("button", {
                type: "button",
                "aria-label": "뒤로가기",
                css: [Ft, Rn],
                onClick: e,
                children: a(xn, {
                  name: "icon-arrow-back-ios-mono",
                  size: 28,
                  color: _.grey600,
                }),
              }),
              a(ne, {
                typography: "h6",
                fontWeight: "semibold",
                color: _.grey800,
                children: "할인할 상품 선택",
              }),
            ],
          }),
          a(W, {
            click: {
              schemaId: Bs.할인할_상품선택_전체선택_클릭,
            },
            children: a(Uo, {
              type: "button",
              typography: "st11",
              variant: "underline",
              css: {
                marginRight: 4,
              },
              onClick: () => {
                d(!c);
              },
              children: c ? "모두해제" : "전체선택",
            }),
          }),
        ],
      }),
      a(xe.Scrollable, {
        css: {
          paddingLeft: 50,
          paddingRight: 25,
        },
        children: a(cL, {
          items: s,
          onChange: u,
          emptyPlaceholder: "등록된 상품이 없어요.",
        }),
      }),
      a(xe.BottomActions, {
        css: {
          height: 106,
          padding: "22px 90px",
        },
        children: y(I.Horizontal, {
          justify: "flex-end",
          gutter: 12,
          css: $e,
          children: [
            a(W, {
              click: {
                schemaId: Bs.할인할_상품선택_닫기_클릭,
              },
              children: a(Ye, {
                htmlType: "button",
                type: "default",
                size: "xlarge",
                onClick: t,
                children: "취소",
              }),
            }),
            a(W, {
              click: {
                schemaId: Bs.할인할_상품선택_저장_클릭,
              },
              params: () => XBs(l, r),
              children: a(Ye, {
                htmlType: "button",
                type: "primary",
                size: "xlarge",
                disabled: s.length === 0,
                onClick: () => {
                  const h = {
                    shouldDirty: !0,
                    shouldValidate: !0,
                  };
                  (i("autoApply.condition.appliedToAll", l.length === 0, h),
                    i("autoApply.targets", l, h),
                    e());
                },
                css: {
                  minWidth: 160,
                },
                children: "저장",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}

function XBs(e, t) {
  const n = e.filter((s) => s.targetType === "CATEGORY").map((s) => s.targetId),
    r = n.map((s) => {
      var u;
      return (
        ((u = t.find((l) => l.category.id === s)) == null
          ? void 0
          : u.category.title) ?? ""
      );
    }),
    i = e.filter((s) => s.targetType === "ITEM").map((s) => s.targetId),
    o = i.map((s) => {
      var u;
      return ((u = t.find((l) => l.id === s)) == null ? void 0 : u.title) ?? "";
    });
  return {
    categoryIds: n,
    categoryTitles: r,
    itemIds: i,
    itemTitles: o,
  };
}

function QBs({ options: e, open: t, onClose: n, onSubmit: r }) {
  const [i, o] = q("modify"),
    s = yi({
      defaultValues: ZBs(e),
    }),
    u = te(e.mode)
      .with("create", () => "새 할인 추가")
      .with("edit", () => "할인 수정")
      .exhaustive(),
    l = ht(),
    { openConfirm: c } = gn(),
    d = async () => {
      (Ht(e.mode === "edit"),
        ye.log(Bs.할인_등록수정_삭제_클릭, {
          discountId: e.discount.id,
        }),
        (await c({
          title: "할인을 삭제할까요?",
          confirmButton: a(oi.ConfirmButton, {
            type: "danger",
            children: "삭제하기",
          }),
          cancelButton: "취소",
        })) && (await PBs(e.discount.id), Pin(), n()));
    },
    h = async (p) => {
      var f, g, m, v, b, C;
      if (
        (ye.log(Bs.할인_등록수정_확인_클릭, {
          discountName: p.title,
          discount: p.value,
          discountType: p.type,
          autoYn: p.autoApply != null,
          appliedToAllYn:
            (g = (f = p.autoApply) == null ? void 0 : f.condition) == null
              ? void 0
              : g.appliedToAll,
          diningOptions:
            (v = (m = p.autoApply) == null ? void 0 : m.condition) == null
              ? void 0
              : v.diningOptions,
          discountTimeYn:
            ((C = (b = p.autoApply) == null ? void 0 : b.condition) == null
              ? void 0
              : C.schedule) != null,
        }),
        p.type === "FIXED_PERCENTAGE" && p.value > 100)
      ) {
        l.open({
          icon: "icn-warning-color",
          message: "할인금액을 다시 확인해주세요!",
          position: "top",
        });
        return;
      }
      if (p.autoApply != null) {
        const {
          autoApply: {
            condition: { appliedToAll: x, diningOptions: w, schedule: A },
            targets: E,
          },
        } = p;
        if (x && IRe(w, M4t) && A == null) {
          ye.log(Bs.할인_등록수정_조건없이확인_팝업);
          const T = await c({
            title: "모든 주문에 할인을 자동 적용할까요?",
            confirmButton: "네, 적용할게요",
            cancelButton: "취소",
          });
          if (
            (ye.log(
              T
                ? Bs.할인_등록수정_조건없이확인_팝업_적용_클릭
                : Bs.할인_등록수정_조건없이확인_팝업_다시보기_클릭,
            ),
            !T)
          )
            return;
        }
        if (!x && E.length === 0) {
          s.setError("autoApply.targets", {
            message: "할인 상품을 선택해주세요",
          });
          return;
        }
        if (
          A != null &&
          A.dayOfWeeks == null &&
          A.timeRange == null &&
          A.dateRange == null
        ) {
          s.setError("autoApply.condition.schedule", {
            message: "할인 시간대 ・ 기간을 설정해주세요",
          });
          return;
        }
      }
      try {
        const x = JBs(p),
          w = await te(e)
            .with(
              {
                mode: "create",
              },
              () => IBs(x),
            )
            .with(
              {
                mode: "edit",
              },
              (A) => OBs(A.discount.id, x),
            )
            .exhaustive();
        (Pin(), r(w));
      } catch (x) {
        if (Yn(x) && x.errorCode === "4000") {
          l.open({
            icon: "icn-warning-color",
            message: "중복되는 이름의 할인이 있어요!",
            position: "top",
          });
          return;
        }
        throw x;
      }
    };
  return a(xe, {
    open: t,
    onClose: n,
    css: {
      minWidth: 754,
      minHeight: 684,
    },
    children: a(co, {
      ...s,
      children: te(i)
        .with("modify", () =>
          a(W, {
            screen: {
              schemaId: Bs.할인_등록수정_다이얼로그,
            },
            params: {
              mode: e.mode,
            },
            children: a(YBs, {
              title: u,
              onClose: n,
              onItemsSelect: () => o("selectItems"),
              onScheduleSetting: () => o("scheduleSetting"),
              isDeleteAvailable: e.mode === "edit",
              onDelete: d,
              onSubmit: h,
            }),
          }),
        )
        .with("selectItems", () =>
          a(Oe, {
            children: a(KBs, {
              onBack: () => o("modify"),
              onClose: n,
            }),
          }),
        )
        .with("scheduleSetting", () =>
          a(EBs, {
            defaultValues: s.watch("autoApply.condition.schedule"),
            onSubmit: (p) => {
              (s.setValue("autoApply.condition.schedule", p, {
                shouldValidate: !0,
                shouldDirty: !0,
              }),
                o("modify"));
            },
            onBack: () => o("modify"),
            onClose: n,
          }),
        )
        .exhaustive(),
    }),
  });
}

function ZBs(e) {
  switch (e.mode) {
    case "create":
      return {
        title: "",
        type: "FIXED_AMOUNT",
        source: "POS",
        value: 0,
      };
    case "edit": {
      const {
        title: t,
        titleI18n: n,
        code: r,
        type: i,
        source: o,
        percentage: s,
        amountMoney: u,
        autoApply: l,
      } = e.discount;
      return (
        Ht(i === "FIXED_AMOUNT" || i === "FIXED_PERCENTAGE"),
        {
          title: t,
          code: r,
          titleI18n: n,
          type: i,
          source: o,
          value: s > 0 ? s : u,
          autoApply: l,
        }
      );
    }
  }
}

function JBs(e) {
  const {
    title: t,
    titleI18n: n,
    code: r,
    type: i,
    source: o,
    value: s,
    autoApply: u,
  } = e;
  return {
    title: t,
    titleI18n: Gt(
      M4(n, {
        language: "en-US",
      }),
    )
      ? null
      : n,
    type: i,
    code: r,
    discountType: i,
    source: o,
    amountMoney: i === "FIXED_AMOUNT" ? s : void 0,
    percentage: i === "FIXED_PERCENTAGE" ? s : void 0,
    autoApply: u,
  };
}

function Hhr() {
  const { open: e } = sn();
  return K(
    (t) =>
      new Promise((n, r) => {
        e(({ isOpen: i, close: o }) =>
          a(QBs, {
            options: t,
            open: i,
            onClose: () => {
              (o(), r(new Kt()));
            },
            onSubmit: (s) => {
              (o(), n(s));
            },
          }),
        );
      }),
    [e],
  );
}

function eSs() {
  const e = Hhr();
  return a(ir, {
    schemaId: Bs.할인적용_새할인_추가_버튼_클릭,
    children: a(gd, {
      variant: "placeholder",
      css: Ft,
      onClick: async () => {
        await e({
          mode: "create",
        });
      },
      children: "+ 새 할인 추가",
    }),
  });
}

function QNe(e) {
  const { data: t } = st({
    queryKey: W8t.discounts,
    queryFn: () => Xnr(),
  });
  return me(
    () => nSs(tSs(t), e == null ? void 0 : e.types),
    [t, e == null ? void 0 : e.types],
  );
}

function tSs(e) {
  return e.sort((t, n) => t.id - n.id);
}

function nSs(e, t) {
  return e.filter((n) => (t != null ? t.includes(n.type) : !0));
}

function jhr({ discount: e, selected: t, onClick: n, className: r }) {
  const i = cO(e),
    o = i ? `(자동) ${e.title}` : e.title;
  return a(W, {
    click: {
      schemaId: Bs.할인적용_할인_선택,
    },
    params: {
      id: e.id,
      title: o,
      discountName: e.title,
      discountType: e.type,
      discountValue: jut(e),
      autoApply: e.autoApply != null,
    },
    children: y(gd, {
      className: r,
      theme: t ? "blue" : "grey",
      variant: i ? void 0 : "border",
      rightAddon: a(gd.Icon, {
        name: t ? "icon-check-fill" : "icon-circle-empty-mono",
      }),
      onClick: n,
      css: [
        Ft,
        {
          maxWidth: "100%",
          overflow: "hidden",
        },
      ],
      children: [
        a("span", {
          css: fn,
          children: o,
        }),
        " ",
        a("span", {
          children: jut(e),
        }),
      ],
    }),
  });
}

function rSs({ selectedItems: e, value: t, onChange: n }) {
  const r = QNe({
      types: ["FIXED_AMOUNT", "FIXED_PERCENTAGE"],
    })
      .map(ine)
      .filter(cO),
    i = $t((o) => {
      if (o.length === 0) return;
      const s = r.find((u) =>
        o.every((l) => {
          var c;
          return (
            ((c = l.appliedDiscounts) == null
              ? void 0
              : c.some((d) => tme(u, d))) === !0
          );
        }),
      );
      n(s);
    });
  return (
    ie(() => {
      i(e);
    }, [i, e]),
    a(Q, {
      children: r.map((o) => {
        const s = t != null ? tme(o, t) : !1;
        return a(
          jhr,
          {
            discount: o,
            selected: s,
            onClick: () => {
              n(s ? void 0 : o);
            },
          },
          o.id,
        );
      }),
    })
  );
}

function iSs({ value: e, onChange: t }) {
  const n = QNe({
    types: ["FIXED_AMOUNT", "FIXED_PERCENTAGE"],
  })
    .map(ine)
    .filter((r) => !cO(r));
  return a(Q, {
    children: n.map((r) => {
      const i = e.some((o) => tme(o, r));
      return a(
        jhr,
        {
          css: {
            maxWidth: "100%",
          },
          discount: r,
          selected: i,
          onClick: () => {
            t(i ? e.filter((o) => o.id !== r.id) : [...e, r]);
          },
        },
        r.id,
      );
    }),
  });
}
const oSs = [
  {
    name: "원",
    value: "VARIABLE_AMOUNT",
  },
  {
    name: "%",
    value: "VARIABLE_PERCENTAGE",
  },
];

function aSs({ value: e, onChange: t, className: n, disabled: r }) {
  return a(I.Horizontal, {
    gutter: 7,
    className: n,
    children: oSs.map(({ name: i, value: o }) => {
      const s = o === e;
      return a(
        ir,
        {
          schemaId: Bs.할인적용_할인유형_선택,
          params: {
            title: i,
            discountType: o,
          },
          children: a(he, {
            "aria-selected": s,
            type: "dark",
            size: "medium",
            style: s ? "fill" : "weak",
            onClick: () => (t == null ? void 0 : t(o)),
            css: {
              width: 39,
            },
            disabled: r,
            children: i,
          }),
        },
        o,
      );
    }),
  });
}
const sSs = Z(({ target: e, onChange: t }, n) => {
  const [r, i] = q("VARIABLE_AMOUNT"),
    [o, s] = q("0"),
    u = Number(o),
    l = u === 0;
  return (
    ie(() => {
      if (u > 0) {
        const c = uSs({
          target: e,
          discountType: r,
          discountValue: u,
        });
        t(c);
      } else t(void 0);
    }, [e, u, r, t]),
    ma(
      n,
      () => ({
        reset: () => {
          (s("0"), i("VARIABLE_AMOUNT"));
        },
      }),
      [],
    ),
    y(I.Vertical, {
      gutter: 20,
      css: {
        width: 257,
      },
      children: [
        a("div", {
          css: {
            margin: "0 -16px",
          },
          children: a(Io, {
            variant: "line",
            "aria-label": "직접입력",
            placeholder: "직접입력",
            value: l ? "" : fe(o),
            onChange: (c) => {
              s(ga(c.target.value));
            },
            inputMode: "none",
            paddingBottom: 0,
            paddingTop: 16,
            right: a(aSs, {
              value: r,
              onChange: i,
            }),
          }),
        }),
        a(H.Center, {
          css: {
            marginTop: 28,
          },
          children: a(Wa, {
            addonKey: "00",
            options: {
              isDigit: !0,
              min: 0,
            },
            value: o,
            onChange: s,
            css: {
              width: 257,
            },
          }),
        }),
      ],
    })
  );
});

function uSs({ target: e, discountType: t, discountValue: n }) {
  return B8({
    title: te(e)
      .with("order", () => "전체할인")
      .with("orderItems", () => "할인")
      .exhaustive(),
    type: t,
    discountType: t,
    source: "POS",
    value: te(t)
      .with("VARIABLE_AMOUNT", () => ({
        type: "AMOUNT",
        amountMoney: n,
      }))
      .with("VARIABLE_PERCENTAGE", () => ({
        type: "PERCENTAGE",
        percentage: n,
      }))
      .exhaustive(),
  });
}

function lSs({
  selectedTarget: e = "orderItems",
  targets: t,
  selectedItems: n = [],
  referenceTime: r = new Date(),
  open: i,
  onTargetChange: o,
  onClose: s,
  onCancel: u,
  onSubmit: l,
  disabled: c = !1,
  isCancellable: d = !0,
  discountModifyAvailable: h = !0,
  dialogOptions: p,
}) {
  const [f, g] = q(),
    [m, v] = q([]),
    [b, C] = q(),
    x = [f, ...m, b].filter(or),
    w = de(null),
    { openConfirm: A } = gn(),
    E = async (P) => {
      if (
        !n
          .map((R) => ({
            ...R,
            appliedDiscounts: [],
          }))
          .every((R) => Gut(R, P, r))
      ) {
        ye.log(Bs.할인적용_조건맞지않음_팝업);
        const R = await A({
          title: `자동 할인의 조건과 맞지 않아요.
그래도 적용하시겠어요?`,
          confirmButton: "할인 적용",
          cancelButton: "취소",
        });
        return (
          ye.log(
            R
              ? Bs.할인적용_조건맞지않음_팝업_적용_클릭
              : Bs.할인적용_조건맞지않음_팝업_취소_클릭,
          ),
          R
        );
      }
      return !0;
    },
    T = async () => {
      if (b !== void 0) {
        l == null ||
          l({
            target: e,
            type: "variableDiscount",
            discount: b,
          });
        return;
      }
      (f != null && !(await E(f))) ||
        l == null ||
        l({
          target: e,
          type: "fixedDiscounts",
          discounts: m,
          autoApplyDiscount: f,
        });
    },
    B = ro(),
    S = an(),
    F = {
      discountType: x.map((P) => P.type),
      discountValue: x.map((P) =>
        te(P.value)
          .with(
            {
              type: "AMOUNT",
            },
            ($) => $.amountMoney,
          )
          .with(
            {
              type: "PERCENTAGE",
            },
            ($) => $.percentage,
          )
          .exhaustive(),
      ),
      discountTitle: x.map((P) => P.title),
    },
    O = () => {
      (v([]), g(void 0), C(void 0));
    };
  return y(xe, {
    open: i,
    onClose: s,
    ...p,
    css: {
      position: "relative",
      maxWidth: 640,
      maxHeight: 547,
    },
    children: [
      a(xe.CloseButton, {
        onClick: s,
        iconSize: 26,
        css: {
          right: 27,
        },
      }),
      t.length === 1
        ? a(xe.Title, {
            css: {
              padding: "36px 45px 10px 45px",
            },
            children: a(ee, {
              typography: "t4",
              fontWeight: "bold",
              color: _.grey700,
              children: gQe(e),
            }),
          })
        : a(H, {
            align: "center",
            css: {
              padding: "36px 45px 10px 45px",
            },
            children: a(yf, {
              selectedValue: e,
              onChange: (P) => {
                (O(),
                  o == null || o(P),
                  ye.log(Bs.주문_페이지_탭_클릭, {
                    text: P === "order" ? "총 금액 할인" : "상품별 할인",
                  }));
              },
              children: t.map((P, $) =>
                a(
                  yf.Item,
                  {
                    value: P,
                    children: a(H, {
                      css: {
                        marginLeft: 20,
                        marginRight: 20,
                      },
                      align: "center",
                      children:
                        e === P
                          ? a(ee, {
                              color: M.grey800,
                              typography: "t4",
                              fontWeight: "bold",
                              children: gQe(P),
                            })
                          : a(ee, {
                              color: M.grey600,
                              typography: "t4",
                              fontWeight: "medium",
                              children: gQe(P),
                            }),
                    }),
                  },
                  `${$}_${P}`,
                ),
              ),
            }),
          }),
      y(H, {
        justify: "space-between",
        css: {
          gap: 20,
          padding: "14px 40px 135px 42px",
          overflow: "hidden",
        },
        children: [
          a(H, {
            direction: "column",
            css: {
              height: "100%",
              paddingTop: 13,
            },
            children: a(Wb, {
              scrollable: B,
              css: {
                flex: 1,
              },
              children: a(I.Vertical, {
                gutter: 10,
                css: {
                  maxWidth: 260,
                },
                children: y(Oe, {
                  children: [
                    e === "orderItems"
                      ? a(rSs, {
                          selectedItems: n,
                          value: f,
                          onChange: (P) => {
                            var $;
                            (g(P), ($ = w.current) == null || $.reset());
                          },
                        })
                      : null,
                    a(iSs, {
                      value: m.filter(
                        (P) =>
                          P.type === "FIXED_AMOUNT" ||
                          P.type === "FIXED_PERCENTAGE",
                      ),
                      onChange: (P) => {
                        var $;
                        (v(P), ($ = w.current) == null || $.reset());
                      },
                    }),
                    h ? a(eSs, {}) : null,
                  ],
                }),
              }),
            }),
          }),
          a(sSs, {
            ref: w,
            target: e,
            onChange: C,
          }),
        ],
      }),
      y(H.CenterVertical, {
        justify: "space-between",
        css: {
          position: "absolute",
          padding: "0 40px",
          left: 0,
          right: 0,
          bottom: 51,
        },
        children: [
          h
            ? a(W, {
                click: {
                  schemaId: Bs.할인적용_수정_버튼_클릭,
                },
                params: F,
                children: a(Ye, {
                  variant: "weak",
                  type: "primary",
                  size: "large",
                  onClick: async () => {
                    await S({
                      to: "/main/catalogs/settings/discounts",
                    });
                  },
                  children: "수정",
                }),
              })
            : a("div", {}),
          y(I.Horizontal, {
            gutter: 12,
            children: [
              d
                ? a(W, {
                    click: {
                      schemaId: Bs.할인적용_취소_버튼_클릭,
                    },
                    params: F,
                    children: a(Ye, {
                      size: "large",
                      onClick: u,
                      children: "취소",
                    }),
                  })
                : null,
              a(W, {
                click: {
                  schemaId: Bs.할인적용_확인_클릭,
                },
                params: F,
                children: a(Ye, {
                  type: "primary",
                  size: "large",
                  css: {
                    minWidth: 190,
                  },
                  disabled: c,
                  onClick: T,
                  children: "확인",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function gQe(e) {
  return te(e)
    .with("order", () => "총 금액 할인")
    .with("orderItems", () => "상품별 할인")
    .exhaustive();
}
