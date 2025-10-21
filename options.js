import {
  Children as mr,
  cloneElement as xr,
  createContext as _n,
  forwardRef as Z,
  Fragment as Ui,
  Suspense as Oe,
  useCallback as K,
  useContext as bt,
  useEffect as ie,
  useLayoutEffect as Ti,
  useState as q,
} from "react";
import * as ge from "react";

function uIs() {
  return K(
    ({ optionChoices: e }) =>
      new Promise((t, n) => {
        yn.open(({ isOpen: r, unmount: i }) =>
          a(Oe, {
            fallback: null,
            children: a(oIs, {
              open: r,
              onSave: (o) => {
                (t(o), i());
              },
              onClose: () => {
                (n(new Kt()), i());
              },
              optionChoices: e,
            }),
          }),
        );
      }),
    [],
  );
}

function n7t({
  value: e,
  onChange: t,
  disabled: n = !1,
  disabledEmojis: r,
  error: i,
  children: o = a(n7t.Trigger, {}),
  className: s,
}) {
  const [u, l, c] = qM(!1),
    d = mr.only(o),
    h = xr(d, {
      value: e,
      error: i,
      onClick: (p) => {
        var f, g;
        (l(), (g = (f = d.props).onClick) == null || g.call(f, p));
      },
    });
  return a(KA, {
    open: u,
    disabled: n,
    placement: "bottom-end",
    offset: 11,
    interactive: !0,
    onClose: c,
    onClickOutside: c,
    message: a(dIs, {
      disabledEmojis: r,
      onChange: (p) => {
        (t == null || t(p), c());
      },
      onClose: c,
    }),
    className: s,
    children: h,
  });
}
n7t.Trigger = Z(({ type: e = "button", value: t, error: n, ...r }, i) =>
  a(lIs, {
    type: e,
    ref: i,
    "aria-label": "이모지 선택하기",
    "data-error": n,
    ...r,
    children:
      t != null
        ? a(Qt, {
            shape: {
              width: 28,
            },
            backgroundColor: "transparent",
            content: a($i, {
              src: t,
            }),
          })
        : a(Qt, {
            shape: gt.CleanW24,
            backgroundColor: "transparent",
            content: a(Hn, {
              name: "icon-plus-small",
            }),
          }),
  }),
);
const lIs = nt.button`
  ${Rn};
  ${Ft};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${_.grey200};

  &[aria-expanded='true'] {
    border: 1px solid ${_.blue500};
  }

  &[data-error='true'] {
    border: 1px solid ${_.red500};
  }
`,
  cIs = [
    {
      name: "얼음",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F9CA.png",
    },
    {
      name: "불",
      value: "https://static.toss.im/icons/png/4x/icon-emoji-fire.png",
    },
    {
      name: "베이컨",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F953.png",
    },
    {
      name: "야채",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F96C.png",
    },
    {
      name: "패티",
      value: "https://static.toss.im/icons/png/4x/icon-patty.png",
    },
    {
      name: "토마토",
      value: "https://static.toss.im/icons/png/4x/icon-tomato-slice.png",
    },
    {
      name: "해쉬브라운",
      value: "https://static.toss.im/icons/png/4x/icon-hash-brown.png",
    },
    {
      name: "아보카도",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F951.png",
    },
    {
      name: "치즈",
      value: "https://static.toss.im/icons/png/4x/icon-slice-cheese.png",
    },
    {
      name: "할라피뇨",
      value: "https://static.toss.im/icons/png/4x/icon-jalapeno.png",
    },
    {
      name: "요리사",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F373.png",
    },
    {
      name: "고구마",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F360.png",
    },
    {
      name: "식빵",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F35E.png",
    },
    {
      name: "밥",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F35A.png",
    },
    {
      name: "영유아",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F476.png",
    },
    {
      name: "고추",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F336.png",
    },
    {
      name: "바나나",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F34C.png",
    },
    {
      name: "꿀",
      value: "https://static.toss.im/2d-emojis/png/4x/u1F36F.png",
    },
  ];

function dIs({ disabledEmojis: e = [], onChange: t, onClose: n }) {
  const [r, i] = q(!1);
  return y(H, {
    direction: "column",
    css: {
      position: "relative",
      width: 360,
      height: 257,
      boxShadow: `0px 12px 20px 5px ${_.greyOpacity200}`,
      borderRadius: 19,
      padding: "21px 27px 34px 27px",
      backgroundColor: _.white,
    },
    children: [
      a(hIs, {
        onClick: n,
      }),
      a(ne, {
        typography: "small",
        color: r ? _.red500 : _.grey500,
        css: {
          marginBottom: 20,
        },
        children: r ? "다른 항목에 사용한 이모지예요" : "이모지 고르기",
      }),
      a("div", {
        css: {
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridColumnGap: 13,
          gridRowGap: 21,
        },
        children: cIs.map(({ name: o, value: s }) => {
          const u = e.includes(s);
          return a(
            $i,
            {
              src: s,
              "aria-label": o,
              role: "button",
              css: {
                opacity: u ? 0.6 : 1,
                cursor: "pointer",
              },
              onClick: () => {
                u ? i(!0) : (i(!1), t == null || t(s));
              },
            },
            s,
          );
        }),
      }),
    ],
  });
}

function hIs({ onClick: e }) {
  return a("button", {
    type: "button",
    onClick: e,
    css: [
      Rn,
      Ft,
      {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 21,
        right: 29,
      },
    ],
    children: a(Qt, {
      shape: gt.CleanW24,
      backgroundColor: "transparent",
      content: a(Hn, {
        name: "icon-x-circle-mono",
        color: _.grey500,
      }),
    }),
  });
}

function pIs({ index: e }) {
  const { control: t, watch: n } = ot(),
    r = n("choices")
      .map((i) => i.imageUrl)
      .filter((i, o) => o !== e)
      .filter(or);
  return a(Tt, {
    control: t,
    name: `choices.${e}.imageUrl`,
    render: ({ field: { value: i, onChange: o }, fieldState: { error: s } }) =>
      a(ps, {
        feature: "choices.imageUrl",
        behaviour: "disable",
        children: a(n7t, {
          value: i,
          onChange: o,
          disabledEmojis: r,
          error: s != null,
        }),
      }),
  });
}

function Npr({ index: e }) {
  const { control: t } = ot();
  return a(Tt, {
    control: t,
    name: `choices.${e}.priceValue`,
    rules: {
      required: !0,
    },
    render: ({ field: { onChange: n, value: r } }) =>
      a(ps, {
        feature: "choices.priceValue",
        behaviour: "disable",
        children: a(Me.TextField, {
          css: {
            flex: "1 0 150px",
          },
          value: fe(r),
          onChange: (i) => {
            n(eko(i.target.value));
          },
          rightAddon: a(ne, {
            typography: "p",
            children: "원",
          }),
          placeholder: "0",
        }),
      }),
  });
}

function Vpr({ index: e }) {
  const { control: t, getValues: n, setValue: r } = ot(),
    { openConfirm: i } = gn();
  return a(Tt, {
    control: t,
    name: `choices.${e}.state`,
    render: ({ field: { value: o, onChange: s } }) => {
      const u = o === "SOLD_OUT",
        l = n(`choices.${e}.id`),
        c = n(`choices.${e}.title`);
      return a(W, {
        click: {
          schemaId: Wt.옵션_등록수정_품절_클릭,
          params: {
            activeYn: u ? "N" : "Y",
            optionChoiceId: l,
            optionTitle: c,
          },
        },
        children: a(ps, {
          feature: "choices.state",
          behaviour: "disable",
          children: a(fIs, {
            checked: u,
            onClick: async () => {
              const d = u ? "ON_SALE" : "SOLD_OUT",
                h = n("defaultChoices");
              if (d === "SOLD_OUT" && h.includes(l)) {
                if (
                  !(await i({
                    title: `${c} 옵션이 기본값으로 설정되어 있어요`,
                    description: "그래도 품절 처리할게요",
                    confirmButton: "품절",
                  }))
                )
                  return;
                r(
                  "defaultChoices",
                  h.filter((f) => f !== l),
                );
              }
              s(d);
            },
          }),
        }),
      });
    },
  });
}

function fIs({ checked: e, ...t }) {
  return a(Ye, {
    variant: "border",
    leftAddon: a(xn, {
      name: "icon-check-large-mono",
      color: e ? _.blue500 : void 0,
      size: 18,
    }),
    size: "large",
    css: {
      color: e ? `${_.blue500} !important` : void 0,
    },
    ...t,
    children: "품절",
  });
}

function gIs({ index: e, choice: t }) {
  const { register: n } = ot();
  return a(ps, {
    feature: "choices.title",
    behaviour: "disable",
    children: a(Gn, {
      size: "medium",
      children: a(Gn.Content, {
        variant: "default",
        children: a(Gn.Item, {
          rightAddon: a(wre, {
            item: t,
          }),
          children: a(Lg, {
            ...n(`choices.${e}.title`, {
              required: !0,
            }),
            placeholder: "예) HOT",
            maxLength: 13,
          }),
        }),
      }),
    }),
  });
}

function mIs({ index: e, choice: t }) {
  const { register: n, control: r } = ot(),
    i = Qw();
  return a(ps, {
    feature: "title",
    behaviour: "disable",
    children: a(Gn, {
      size: "medium",
      children: y(Gn.Content, {
        variant: "default",
        children: [
          a(Gn.Item, {
            children: a(Lg, {
              ...n(`choices.${e}.title`, {
                required: !0,
              }),
              placeholder: "예) HOT",
              maxLength: 13,
            }),
          }),
          a(Gn.ContentSeparator, {}),
          a(Gn.Item, {
            rightAddon: a(wre, {
              item: t,
            }),
            children: a(Tt, {
              name: `choices.${e}.titleI18n`,
              control: r,
              render: ({ field: { value: o, onChange: s } }) =>
                a(Lg, {
                  value: (o == null ? void 0 : o.languages["en-US"]) ?? "",
                  placeholder: `${i.enabledFeatures.filter((u) => u !== "링크예약").join("・")}용 영문명`,
                  onChange: (u) => {
                    const l = u.target.value;
                    s(
                      i8({
                        "en-US": l,
                      }),
                    );
                  },
                }),
            }),
          }),
        ],
      }),
    }),
  });
}

function yIs({ className: e, index: t, choice: n, onRemove: r, disabled: i }) {
  return y(I.Horizontal, {
    justify: "space-between",
    align: "stretch",
    gutter: 12,
    className: e,
    children: [
      a(gIs, {
        index: t,
        choice: n,
      }),
      a(Npr, {
        index: t,
      }),
      a(Vpr, {
        index: t,
      }),
      a(ps, {
        feature: "choices.remove",
        behaviour: "disable",
        children: a(Ye, {
          variant: "weak",
          size: "large",
          disabled: i,
          onClick: r,
          "aria-label": "삭제",
          children: a(Ye.Icon, {
            name: "icon-bin-line-mono",
          }),
        }),
      }),
    ],
  });
}

function vIs({
  className: e,
  index: t,
  choice: n,
  onRemove: r,
  showKioskEmojiSelect: i,
  disabled: o,
}) {
  return y(H, {
    direction: "column",
    children: [
      a(mIs, {
        index: t,
        choice: n,
      }),
      a(ce, {
        size: 8,
      }),
      y(I.Horizontal, {
        justify: "space-between",
        align: "stretch",
        gutter: 8,
        css: $e,
        className: e,
        children: [
          a(Npr, {
            index: t,
          }),
          i
            ? a(pIs, {
                index: t,
              })
            : null,
          a(Vpr, {
            index: t,
          }),
          a(ps, {
            feature: "choices.remove",
            behaviour: "disable",
            children: a(Ye, {
              variant: "weak",
              size: "large",
              disabled: o,
              onClick: r,
              "aria-label": "삭제",
              leftAddon: a(Ye.Icon, {
                name: "icon-bin-line-mono",
              }),
              children: "삭제",
            }),
          }),
        ],
      }),
    ],
  });
}

function bIs({ className: e }) {
  const {
      control: t,
      setValue: n,
      watch: r,
      formState: { errors: i },
    } = ot(),
    o = uIs(),
    { hasEnabledFeatures: s } = Qw(),
    {
      fields: u,
      remove: l,
      append: c,
    } = Xbe({
      name: "choices",
      keyName: "key",
      control: t,
      rules: {
        minLength: 1,
      },
    }),
    d = s && r("kioskEnabled") === !0,
    h = r("choices"),
    p = h.filter((b) => !Gt(b.title)).length === 0,
    [f, g] = q(h.some((b) => b.imageUrl != null)),
    m = iIs(u.length, i),
    v = () => {
      n(
        "choices",
        h.map((b) => ({
          ...b,
          imageUrl: null,
        })),
        {
          shouldDirty: !0,
          shouldValidate: !0,
        },
      );
    };
  return y(I.Vertical, {
    gutter: 0,
    className: e,
    align: "stretch",
    children: [
      y(H, {
        align: "center",
        justify: "space-between",
        children: [
          a(ne, {
            typography: "p",
            color: _.grey800,
            fontWeight: "medium",
            style: {
              textAlign: "left",
            },
            children: "옵션이름",
          }),
          d
            ? y(I.Vertical, {
                gutter: 3,
                justify: "flex-end",
                children: [
                  a(ps, {
                    feature: "showKioskEmoji",
                    behaviour: "disable",
                    children: a(Bb, {
                      label: "키오스크에서 아이콘 보여주기",
                      size: "small",
                      checked: f,
                      onChange: (b) => {
                        const C = b.target.checked;
                        (ye.log(Wt.옵션_등록수정_키오스크_아이콘_노출_클릭, {
                          activeYn: C ? "Y" : "N",
                        }),
                          g(C),
                          v());
                      },
                    }),
                  }),
                  m
                    ? a(ne, {
                        typography: "small",
                        color: _.red500,
                        children: "모든 항목에 이모지를 넣어야 해요",
                      })
                    : null,
                ],
              })
            : null,
        ],
      }),
      a(ce, {
        size: 16,
      }),
      u.map((b, C) =>
        a(
          Ui,
          {
            children: d
              ? a(vIs, {
                  index: C,
                  choice: b,
                  onRemove: () => {
                    (l(C), n("defaultChoices", []));
                  },
                  showKioskEmojiSelect: d && f,
                  css: {
                    marginBottom: 12,
                  },
                  disabled: u.length === 1,
                })
              : a(yIs, {
                  index: C,
                  choice: b,
                  onRemove: () => {
                    (l(C), n("defaultChoices", []));
                  },
                  showKioskEmojiSelect: d && f,
                  css: {
                    marginBottom: 12,
                  },
                  disabled: u.length === 1,
                }),
          },
          `${b.key}_${d}`,
        ),
      ),
      a(ce, {
        size: 8,
      }),
      y(H, {
        justify: "space-between",
        children: [
          a(ps, {
            feature: "addChoices",
            behaviour: "disable",
            children: a(qd, {
              color: "blue",
              variant: "normal",
              onClick: () => {
                c({
                  id: CIs(u.map((b) => b.id)),
                  title: "",
                  priceValue: "",
                  order: xIs(h),
                  imageUrl: null,
                  state: "ON_SALE",
                  franchiseNewBadge: !1,
                  franchiseUpdateBadge: !1,
                });
              },
              children: " 추가하기",
            }),
          }),
          a(W, {
            click: {
              schemaId: Wt.옵션_등록_수정_다이얼로그_순서편집_클릭,
            },
            children: a(qd, {
              type: "button",
              variant: "arrow",
              disabled: p,
              onClick: async () => {
                const b = await o({
                  optionChoices: h,
                });
                n("choices", b, {
                  shouldValidate: !0,
                  shouldDirty: !0,
                });
              },
              children: "순서편집",
            }),
          }),
        ],
      }),
    ],
  });
}

function CIs(e) {
  const t = Math.min(...e);
  return 0 < t ? -1 : t - 1;
}

function xIs(e) {
  return Math.max(...e.map((t) => t.order), 0) + 1;
}

function wIs({ className: e }) {
  const { register: t } = ot();
  return a(Me, {
    label: "옵션 그룹",
    required: !0,
    className: e,
    children: a(ps, {
      feature: "title",
      behaviour: "disable",
      children: a(Me.TextField, {
        ...t("title", {
          required: !0,
        }),
        placeholder: "예) 온도",
        autoFocus: !0,
      }),
    }),
  });
}

function _Is({ className: e }) {
  const { register: t, control: n } = ot(),
    r = Qw();
  return a(ps, {
    feature: "title",
    behaviour: "disable",
    children: a(Gn, {
      label: "옵션 그룹",
      required: !0,
      size: "medium",
      className: e,
      children: y(Gn.Content, {
        variant: "default",
        children: [
          a(Gn.Item, {
            children: a(Lg, {
              ...t("title", {
                required: !0,
              }),
              placeholder: "예) 온도",
              autoFocus: !0,
            }),
          }),
          a(Gn.ContentSeparator, {}),
          a(Gn.Item, {
            children: a(Tt, {
              name: "titleI18n",
              control: n,
              render: ({ field: { value: i, onChange: o } }) =>
                a(Lg, {
                  value: (i == null ? void 0 : i.languages["en-US"]) ?? "",
                  placeholder: `${r.enabledFeatures.filter((s) => s !== "링크예약").join("・")}용 영문명`,
                  onChange: (s) => {
                    const u = s.target.value;
                    o(
                      i8({
                        "en-US": u,
                      }),
                    );
                  },
                  css: {
                    margin: 0,
                    padding: 0,
                  },
                }),
            }),
          }),
        ],
      }),
    }),
  });
}

function AIs({
  title: e,
  ctaTitle: t,
  isDeleteAvailable: n = !1,
  onCancel: r,
  onClickSelectingDefaultOption: i,
  onDelete: o,
}) {
  const { formState: s, watch: u } = ot(),
    l = u("kioskEnabled"),
    { hasEnabledFeatures: c } = Qw();
  return y(Q, {
    children: [
      a(xe.Title, {
        css: {
          padding: "40px 70px 20px",
        },
        children: a(ne, {
          typography: "h6",
          fontWeight: "semibold",
          color: _.grey800,
          children: e,
        }),
      }),
      y(xe.Scrollable, {
        css: {
          padding: "0 25px 0 70px",
        },
        children: [
          c ? a(rIs, {}) : null,
          a(ce, {
            size: 12,
          }),
          l === !0 ? a(_Is, {}) : a(wIs, {}),
          a(ce, {
            size: 43,
          }),
          a(bIs, {}),
          a(ce, {
            size: 40,
          }),
          a(Ni, {
            schemaId: Wt.옵션_등록수정_기본값으로_체크할_항목선택,
            capture: "onDefaultChoicesSelectStart",
            children: a(EIs, {
              onDefaultChoicesSelectStart: i,
            }),
          }),
        ],
      }),
      y(xe.BottomActions, {
        css: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 106,
          paddingLeft: 70,
          paddingRight: 99,
        },
        children: [
          n
            ? a(Ye, {
                htmlType: "button",
                type: "danger",
                size: "xlarge",
                onClick: o,
                children: "옵션 삭제",
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
                  schemaId: Wt.옵션_등록수정_CTA버튼_클릭,
                },
                params: {
                  button: "취소",
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
                htmlType: "submit",
                type: "primary",
                size: "xlarge",
                css: {
                  minWidth: 160,
                },
                disabled: !s.isValid,
                loading: s.isSubmitting,
                children: t,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function EIs({ onDefaultChoicesSelectStart: e }) {
  const { watch: t, setValue: n } = ot();
  return a(eIs, {
    value: t(),
    onChange: ({
      titleI18n: r,
      choices: i,
      isRequired: o,
      minChoices: s,
      maxChoices: u,
      defaultChoices: l,
    }) => {
      (n("isRequired", o),
        n("choices", i),
        n("minChoices", s),
        n("maxChoices", u),
        n("defaultChoices", l),
        n("titleI18n", r));
    },
    onDefaultChoicesSelectStart: e,
  });
}
const DIs = ve
  .object({
    title: ve.string().min(1),
    choices: ve.array(
      ve
        .object({
          title: ve.string().min(1),
          priceValue: ve.string().refine((e) => !isNaN(Number(e))),
        })
        .passthrough(),
    ),
  })
  .passthrough();

function TIs(e) {
  return te(e)
    .with(
      {
        mode: "create",
      },
      ({ isKioskEnabled: t }) => ({
        id: -1,
        title: "",
        choices: [
          {
            id: 0,
            title: "",
            priceValue: "",
            order: 0,
            imageUrl: null,
            state: "ON_SALE",
            franchiseNewBadge: !1,
            franchiseUpdateBadge: !1,
          },
        ],
        isRequired: !1,
        minChoices: 0,
        maxChoices: 1,
        defaultChoices: [],
        order: -1,
        kioskEnabled: t,
        franchiseNewBadge: !1,
        franchiseUpdateBadge: !1,
      }),
    )
    .with(
      {
        mode: "editOrDelete",
      },
      ({ item: t }) => BIs(t),
    )
    .run();
}

function BIs(e) {
  return {
    ...e,
    choices: e.choices.map((t) => ({
      ...t,
      priceValue: String(t.priceValue),
    })),
    isRequired: e.minChoices > 0,
  };
}

function oon(e) {
  return {
    ...e,
    choices: e.choices.map(
      (t) => (
        Ht(!isNaN(Number(t.priceValue))),
        {
          ...t,
          priceValue: Number(t.priceValue),
        }
      ),
    ),
  };
}

function lVe() {
  return K(
    (e) =>
      new Promise((t, n) => {
        yn.open(({ isOpen: r, unmount: i }) =>
          a(Oe, {
            children: a(SIs, {
              open: r,
              onClose: () => {
                (n(new Kt()), i());
              },
              onSubmit: () => {
                (t(), i());
              },
              onError: (o) => {
                (n(o), i());
              },
              options: e,
            }),
          }),
        );
      }),
    [],
  );
}

function SIs({ open: e, onClose: t, onSubmit: n, options: r }) {
  var T;
  const i = r.mode === "editOrDelete" ? r.item : void 0,
    o = ht(),
    [s, u, l] = qM(!1),
    { data: c } = Ed(),
    d = ((T = c.franchise) == null ? void 0 : T.catalogManagement) === !0,
    h = Ra({
      withFavorite: !1,
      withPrepaidVoucher: !1,
    }),
    [p] = S1(h, (B) =>
      B.catalogItem.options.some((S) => S.id === (i == null ? void 0 : i.id)),
    ),
    f = p.length > 0,
    g = TG(),
    m = yi({
      defaultValues: TIs({
        isKioskEnabled: r.mode === "create" && r.kioskEnabled === !0,
        ...r,
      }),
      mode: "onChange",
      resolver: pre(DIs),
    }),
    v = te(r.mode)
      .with("create", () => "옵션 추가")
      .with("editOrDelete", () => "옵션 수정")
      .run(),
    b = te(r.mode)
      .with("create", () => "등록")
      .with("editOrDelete", () => "확인")
      .run(),
    { openConfirm: C } = gn(),
    { mutateAsync: x } = z$s(),
    w = async (B) => {
      ye.log(Wt.옵션_등록수정_옵션삭제확인얼랏);
      const S = await C({
        title: "옵션을 삭제할까요?",
        description: f
          ? `이 옵션과 연결된 상품이 있어요
삭제하면 상품에서 이 옵션을 사용할 수 없게 돼요`
          : void 0,
        confirmButton: a(oi.ConfirmButton, {
          type: "danger",
          children: "삭제하기",
        }),
        cancelButton: "취소",
      });
      (ye.log(Wt.옵션_등록수정_옵션삭제확인얼랏_CTA버튼_클릭, {
        button: S ? "삭제하기" : "취소",
      }),
        S && (await x(B.id), n()));
    },
    A = async (B) => {
      const S = await U$s(B);
      (t7t((F = []) => [...F, S]), n());
    },
    E = async (B, S) => {
      ye.log(Wt.옵션_등록수정_옵션수정확인얼랏);
      const F = await C({
        title: "옵션을 수정할게요",
        description:
          "수정하시면 이 옵션과 연결된 모든 상품에 수정내용이 반영돼요.",
        confirmButton: a(oi.ConfirmButton, {
          "aria-label": "옵션 수정 확인",
          children: "확인",
        }),
        cancelButton: "취소",
      });
      (ye.log(Wt.옵션_등록수정_옵션수정확인얼랏_CTA버튼_클릭, {
        button: F ? "확인" : "취소",
        exposeYn: g,
      }),
        F && (await Mpr(B, S), Rpr(), n()));
    };
  return a(W, {
    screen: {
      schemaId: Wt.옵션_등록수정_다이얼로그,
      params: {
        mode: r.mode,
      },
    },
    children: y(xe, {
      open: e,
      onClose: t,
      closeOnDimmerClick: !1,
      children: [
        a(W, {
          click: {
            schemaId: Wt.옵션_등록수정_X버튼_클릭,
          },
          children: a(xe.CloseButton, {}),
        }),
        a(Oe, {
          children: a(co, {
            ...m,
            children: a(Srr, {
              allows: ["choices.state"],
              isAllowed: !d,
              onSubmit: m.handleSubmit(async (B) => {
                const S = W$s(B);
                if (S != null) {
                  m.setError(`choices.${S}.imageUrl`, {
                    message: "모든 항목에 이모지를 넣어야 해요",
                  });
                  return;
                }
                ye.log(Wt.옵션_등록수정_CTA버튼_클릭, {
                  mode: r.mode,
                  button: b,
                  optionTitle: B.title,
                  optionChoicesCnt: B.choices.length,
                  optionChoiceTitleArr: B.choices.map((F) => F.title),
                  optionChoicePriceValueArr: B.choices.map((F) => F.priceValue),
                  optionChoiceIsDefaultArr: B.choices.map((F) =>
                    B.defaultChoices.includes(F.id) ? "y" : "n",
                  ),
                  minChoices: B.minChoices,
                  maxChoices: B.maxChoices,
                  exposeYn: B.kioskEnabled,
                });
                try {
                  switch (r.mode) {
                    case "create":
                      await A(oon(B));
                      break;
                    case "editOrDelete":
                      await E(r.item, oon(B));
                      break;
                  }
                } catch (F) {
                  if (Yn(F)) {
                    if (F.errorCode === "4000") {
                      o.open({
                        icon: "icn-warning-color",
                        message: "중복되는 옵션 그룹이 있어요!",
                        position: "top",
                      });
                      return;
                    }
                    if (F.errorCode === "40010") {
                      o.open({
                        icon: "icn-warning-color",
                        message: "중복되는 옵션 이름이 있어요!",
                        position: "top",
                      });
                      return;
                    }
                  }
                  throw F;
                }
              }),
              css: [
                wn,
                {
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                },
              ],
              children: s
                ? a(Y$s, {
                    onClose: l,
                  })
                : a(AIs, {
                    title: v,
                    ctaTitle: b,
                    isDeleteAvailable: !d && r.mode === "editOrDelete",
                    onCancel: t,
                    onDelete:
                      r.mode === "editOrDelete" ? () => w(r.item) : void 0,
                    onClickSelectingDefaultOption: u,
                  }),
            }),
          }),
        }),
      ],
    }),
  });
}

function kIs({ onClick: e }) {
  return y(H.Center, {
    as: "button",
    css: [
      Rn,
      Ft,
      {
        width: "100%",
        height: 90,
        borderTop: `1px solid ${_.grey100}`,
        borderBottom: `1px solid ${_.grey100}`,
      },
    ],
    onClick: e,
    children: [
      a(xn, {
        name: "icon-plus-mono",
        size: 16,
        color: _.blue500,
      }),
      a(ne, {
        typography: "h6",
        fontWeight: "regular",
        color: _.blue500,
        css: {
          marginLeft: 8,
        },
        children: "새 옵션",
      }),
    ],
  });
}

function FIs({ item: e, onClick: t }) {
  return a("li", {
    css: {
      height: 90,
      borderBottom: `1px solid ${_.grey100}`,
    },
    children: a(ne, {
      as: "button",
      onClick: () => t(e),
      typography: "h6",
      fontWeight: "semibold",
      color: _.grey800,
      css: [
        Rn,
        Ft,
        {
          width: "100%",
          height: "100%",
          textAlign: "left",
          padding: "0 20px",
        },
      ],
      children: e.title,
    }),
  });
}
const $Is = 92;

function IIs({ open: e, onClose: t }) {
  return a(ca, {
    schemaId: Wt.옵션_편집추가_다이얼로그,
    log: e,
    children: y(xe, {
      open: e,
      onClose: t,
      children: [
        a(W, {
          click: {
            schemaId: Wt.옵션_편집추가_X버튼_클릭,
          },
          children: a(xe.CloseButton, {}),
        }),
        a(xe.Title, {
          css: {
            height: $Is,
            padding: "40px 60px 20px",
          },
          children: "옵션 편집/추가",
        }),
        a(xe.Scrollable, {
          css: {
            padding: "0 25px 0 70px",
          },
          children: a(Oe, {
            children: a(PIs, {}),
          }),
        }),
      ],
    }),
  });
}

function PIs() {
  const e = GA(),
    t = lVe(),
    n = ht(),
    r = async () => {
      (await t({
        mode: "create",
      }),
        n.open({
          icon: "icn-success-color",
          message: "새로운 옵션이 등록되었어요.",
          position: "top",
        }));
    },
    i = async (o) => {
      await t({
        mode: "editOrDelete",
        item: o,
      });
    };
  return y(Q, {
    children: [
      a(W, {
        click: {
          schemaId: Wt.옵션_편집추가_새옵션_버튼_클릭,
        },
        children: a(kIs, {
          onClick: r,
        }),
      }),
      a("ul", {
        css: Bc,
        children: e.map((o) =>
          a(
            W,
            {
              click: {
                schemaId: Wt.옵션_편집추가_옵션_선택,
              },
              params: {
                optionId: o.id,
                optionTitle: o.title,
              },
              children: a(FIs, {
                item: o,
                onClick: i,
              }),
            },
            o.id,
          ),
        ),
      }),
    ],
  });
}

function OIs() {
  return K(
    () =>
      new Promise((e, t) => {
        yn.open(({ isOpen: n, unmount: r }) =>
          a(IIs, {
            open: n,
            onClose: () => {
              (e(), r());
            },
            onError: (i) => {
              (t(i), r());
            },
          }),
        );
      }),
    [],
  );
}

function vL({
  type: e = "button",
  state: t = "ON_SALE",
  selected: n = !1,
  disabled: r = !1,
  size: i = "default",
  children: o,
  addon: s,
  ...u
}) {
  const l = te(i)
    .with("default", () => "t7")
    .with("large", () => "t6")
    .exhaustive();
  return y("button", {
    type: e,
    "aria-pressed": n,
    disabled: r,
    css: [Rn, Ft, RIs],
    ...u,
    children: [
      y(ee, {
        typography: l,
        fontWeight: r ? "bold" : "semibold",
        color: "inherit",
        textAlign: "center",
        css: {
          "> span": {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            whiteSpace: "nowrap",
            color: "inherit",
          },
        },
        children: [t === "SOLD_OUT" ? "(품절)" : "", o],
      }),
      s,
    ],
  });
}
vL.SIZE = 46;
const RIs = V`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px 10px;
  height: ${vL.SIZE}px;
  border-radius: 6px;
  background-color: ${_.white};
  color: ${_.grey700};
  transition: box-shadow 225ms ease;

  &[aria-pressed='true'] {
    background-color: ${_.blue500};
    color: ${_.white};
  }

  &:disabled {
    background-color: ${_.grey100};
    cursor: default;
    color: ${_.grey400};
  }
`;

function MIs({ size: e = "default", children: t, ...n }) {
  const r = te(e)
    .with("default", () => "t7")
    .with("large", () => "t6")
    .exhaustive();
  return a("button", {
    css: LIs,
    ...n,
    children: a(ee, {
      typography: r,
      fontWeight: "semibold",
      color: _.white,
      textAlign: "center",
      children: t,
    }),
  });
}
const LIs = V`
  ${Rn};
  padding: 5px 10px;
  height: ${vL.SIZE}px;
  border-radius: 6px;
  background-color: ${_.greyOpacity600};

  &:disabled {
    opacity: 0.3;
  }
`,
  n$e = (e) =>
    a(MIs, {
      css: {
        width: 106,
      },
      ...e,
    });

function NIs() {
  const { orderMenuFontSize: e } = H2(),
    t = OIs();
  return a(W, {
    click: {
      schemaId: Vt.주문_페이지_옵션편집_추가_버튼_클릭,
    },
    children: a(n$e, {
      onClick: t,
      size: e,
      children: "옵션편집/추가",
    }),
  });
}

function VIs() {
  var i;
  const { orderMenuFontSize: e } = H2(),
    { draftOrder: t, activatedItem: n, updateItemMemo: r } = fr();
  return n != null &&
    t.lineItems.some((o) => o.key === n.key) &&
    ((i = n.metadata) == null ? void 0 : i.disableMemoEdit) !== !0
    ? a(n$e, {
        onClick: () => r(n),
        size: e,
        children: "메모",
      })
    : a(n$e, {
        disabled: !0,
        size: e,
        children: "메모",
      });
}

function zIs({ editDisabled: e = !1 }) {
  var o;
  const { orderMenuFontSize: t } = H2(),
    { activatedItem: n, updateItemOptionChoices: r, orderingType: i } = fr();
  return a(W, {
    click: {
      schemaId: Vt.주문_페이지_상세옵션_버튼_클릭,
    },
    children: a(n$e, {
      disabled:
        n == null ||
        n.itemPrice.priceType === "VARIABLE" ||
        i === "VOUCHER" ||
        ((o = n.metadata) == null ? void 0 : o.disableOptionEdit) === !0,
      onClick: () => r(n, !e),
      size: t,
      children: "옵션",
    }),
  });
}
const WIs = {
  MemoButton: VIs,
  OptionsButton: zIs,
  EditOptionsButton: NIs,
};

function UIs({
  type: e = "button",
  "aria-label": t = "옵션 추가하기",
  addon: n,
  ...r
}) {
  return y("button", {
    type: e,
    "aria-label": t,
    css: [Rn, Ft, HIs],
    ...r,
    children: [
      a(rt, {
        name: "icon-plus-mono",
        frameShape: {
          width: 24,
          height: 24,
        },
        color: _.grey500,
      }),
      n,
    ],
  });
}
const HIs = V`
  position: relative;
  padding: 5px 10px;
  height: ${vL.SIZE}px;
  border-radius: 6px;
  border: 1px dashed ${_.grey500};
`;

function zpr({ className: e, onDestroy: t }) {
  const [n, r] = q(!1);
  return (
    ie(() => () => (t == null ? void 0 : t()), [t]),
    n
      ? null
      : a(jo, {
          src: "https://static.toss.im/lotties/general/check.json",
          width: 30,
          height: 30,
          loop: !0,
          onLoopComplete: () => {
            (r(!0), t == null || t());
          },
          className: e,
        })
  );
}

function Wpr({ onDestroy: e }) {
  return a(zpr, {
    onDestroy: e,
    css: {
      position: "absolute",
      right: 5,
      bottom: 5,
      zIndex: 1,
    },
  });
}

function Upr({
  item: e,
  selected: t = !1,
  onDelete: n,
  onClick: r,
  children: i,
  addon: o,
  ...s
}) {
  const { choice: u } = e;
  return y(vL, {
    role: "button",
    selected: t,
    state: u.state,
    onClick: () => (r == null ? void 0 : r(e)),
    addon: y(Q, {
      children: [
        o,
        t
          ? null
          : a(GIs, {
              onClick: (l) => {
                (l.stopPropagation(), n == null || n(e));
              },
            }),
      ],
    }),
    css: jIs,
    ...s,
    children: [
      u.title,
      u.priceValue !== 0
        ? y(Q, {
            children: [
              " ",
              y("b", {
                css: {
                  fontWeight: 400,
                },
                children: ["(", fe(u.priceValue), ")"],
              }),
            ],
          })
        : null,
    ],
  });
}
const jIs = V`
  &[aria-pressed='true'] {
    background-color: ${_.white};
    color: ${_.grey700};
    box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.35);
    border: 3px solid ${_.blue500};
  }
`,
  GIs = ({ onClick: e }) =>
    a("div", {
      "aria-label": "제거하기",
      css: [
        Rn,
        Ft,
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 4,
          right: 4,
        },
      ],
      onClick: e,
      children: a(rt, {
        name: "icon-x-circle",
        frameShape: {
          width: 20,
          height: 20,
        },
      }),
    });

function qIs({ type: e = "button", addon: t, ...n }) {
  return y("button", {
    type: e,
    css: [Rn, Ft, YIs],
    ...n,
    children: [
      a(rt, {
        name: "icon-document-lines-mono",
        frameShape: {
          width: 24,
          height: 24,
        },
        color: _.grey500,
      }),
      t,
    ],
  });
}
const YIs = V`
  position: relative;
  padding: 5px 10px;
  height: ${vL.SIZE}px;
  border-radius: 6px;
  border: 1px dashed ${_.grey500};
`,
  KIs = globalThis != null && globalThis.document ? Ti : () => {},
  XIs = ge.useId || (() => {});
let QIs = 0;

function Hpr(e) {
  const [t, n] = ge.useState(XIs());
  return (
    KIs(() => {
      e || n((r) => r ?? String(QIs++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
const jpr = _n({});

function ZIs({ id: e, children: t }) {
  const n = Hpr("label");
  return a(jpr.Provider, {
    value: {
      id: e ?? n,
    },
    children: t,
  });
}

function Gpr() {
  var e;
  return (e = bt(jpr)) == null ? void 0 : e.id;
}
const qpr = _n({
  selectedValues: [],
  onSelect: () => {},
});

function Kye({
  children: e,
  role: t = "listbox",
  value: n,
  onChange: r,
  column: i,
  autoColumn: o = 4,
  min: s,
  max: u,
  ...l
}) {
  if (((u = u === -1 ? Number.POSITIVE_INFINITY : u), s > u))
    throw new Error(`"min"값이 "max"보다 클 수 없습니다. (min=${s}, max=${u})`);
  const c = (f) => {
      r == null ||
        r(
          $wt(n, f, {
            min: s,
            max: u,
          }),
        );
    },
    d = mr.count(e),
    h = i ?? Math.min(o, d),
    p = Gpr();
  return a(qpr.Provider, {
    value: {
      selectedValues: n,
      onSelect: c,
    },
    children: a("div", {
      role: t,
      "aria-labelledby": p,
      "aria-multiselectable": u > 1,
      css: JIs(h),
      ...l,
      children: e,
    }),
  });
}
const JIs = (e) => V`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(${e}, minmax(0, 1fr));
`;

function ePs(
  {
    children: e,
    role: t = "option",
    disabled: n = !1,
    value: r,
    onClick: i,
    ...o
  },
  s,
) {
  const { selectedValues: u, onSelect: l } = bt(qpr),
    c = u.includes(r);
  return a("div", {
    ref: s,
    role: t,
    "aria-selected": c,
    "aria-disabled": n,
    onClick: (d) => {
      if (n) {
        d.preventDefault();
        return;
      }
      (i == null || i(d), l(r));
    },
    css: [Ft, tPs],
    ...o,
    children: a(ee, {
      typography: "t5",
      fontWeight: n ? "medium" : "bold",
      color: n ? _.grey500 : c ? _.white : _.grey700,
      ellipsisAfterLines: 1,
      css: {
        padding: "0 16px",
      },
      children: e,
    }),
  });
}
const tPs = V`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  min-height: 50px;
  border-radius: 8px;
  white-space: nowrap;
  background-color: ${_.grey200};

  &[aria-selected='true'] {
    background-color: ${_.greyOpacity700};
  }

  &[aria-disabled='true'] {
    background-color: ${_.grey700};
    cursor: default;
  }
`;
Kye.Option = Z(ePs);

function nPs() {
  const { open: e } = sn();
  return K(
    ({ title: t, unavailableChoices: n = [] }) =>
      new Promise((r, i) => {
        e(({ isOpen: o, close: s }) =>
          a(rPs, {
            open: o,
            title: t,
            unavailableChoices: n,
            onSelect: (u) => {
              (r(u), s());
            },
            onClose: () => {
              (i(new Kt("옵션 선택을 취소했어요")), s());
            },
          }),
        );
      }),
    [e],
  );
}
