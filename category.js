import {
  createContext as _n,
  forwardRef as Z,
  Suspense as Oe,
  useCallback as K,
  useContext as bt,
  useEffect as ie,
  useImperativeHandle as ma,
  useMemo as me,
  useRef as de,
  useState as q,
} from "react";
import {
  useMutation as lt,
  useSuspenseQuery as st,
} from "@tanstack/react-query";

const ion = ({ color: e }) =>
    a("div", {
      css: {
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `3px solid ${e}`,
      },
    }),
  LFs = V`
  width: 100%;
  height: 54px;
  background-color: #3388ff;
  border-radius: 10px;
`;

function AE({ children: e, className: t }) {
  return a(NFs, {
    className: t,
    children: e,
  });
}
const NFs = nt.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function Dpr({ children: e }) {
  return a(MS, {
    children: e,
  });
}

function Fp({
  children: e,
  backgroundColor: t = _.white,
  navbar: n = a(f2, {}),
}) {
  return y(AE, {
    css: {
      display: "flex",
      flexDirection: "column",
    },
    children: [
      a("header", {
        children: n,
      }),
      a(VFs, {
        backgroundColor: t,
        children: a(Dpr, {
          children: e,
        }),
      }),
    ],
  });
}
const VFs = nt.main`
  display: flex;
  flex: 1;
  background-color: ${({ backgroundColor: e }) => e};
  overflow: hidden;
`;

function zFs({ children: e, ...t }) {
  return a(WFs, {
    ...t,
    children: a(Oe, {
      children: e,
    }),
  });
}
const WFs = nt.aside({
  flex: "none",
  width: 323,
  height: "100%",
  backgroundColor: _.white,
});

function XC({
  backgroundColor: e = _.grey200,
  navbar: t,
  aside: n,
  children: r,
}) {
  return y(Fp, {
    backgroundColor: e,
    navbar: t,
    children: [
      a(Oe, {
        fallback: a("div", {
          css: {
            flex: 1,
          },
        }),
        children: a(H, {
          direction: "column",
          css: {
            flex: 1,
            overflow: "hidden",
            position: "relative",
          },
          children: r,
        }),
      }),
      n,
    ],
  });
}
XC.Aside = zFs;
async function UFs(e) {
  await Se.delete(`/api/pos/v1/catalog/categories/${e}`);
}

function bre(e) {
  return yt.setQueryData(qC.categories, e);
}

function HFs() {
  const { openConfirm: e } = gn(),
    t = ht();
  return K(
    async (n) => {
      try {
        if (
          !(await e({
            title: `${BA(n.title, "을/를")} 삭제할게요`,
            cancelButton: "취소",
            confirmButton: a(oi.ConfirmButton, {
              type: "danger",
              children: "확인",
            }),
          }))
        )
          throw new Kt(`카테고리(${n.title}) 삭제를 취소했어요`);
        (await UFs(n.id),
          await bre((i = []) => i.filter((o) => o.id !== n.id)));
      } catch (r) {
        if (Yn(r)) {
          if (r.errorCode === "4000") {
            t.open({
              icon: "icn-warning-color",
              message: "카테고리 내 상품이 있어서 삭제할 수 없어요",
              position: "top",
            });
            return;
          }
          if (r.errorCode === "4001") {
            t.open({
              icon: "icn-warning-color",
              message: "마지막 남은 카테고리는 삭제할 수 없어요",
              position: "top",
            });
            return;
          }
        }
        throw r;
      }
    },
    [e, t],
  );
}
const Cre = nt.div`
  padding: 20px 0px;

  border-bottom: 1px solid ${M.grey200};
`,
  xre = V`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 12px;
  align-items: center;
  height: inherit;
`,
  oU = V`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function jFs({ item: e, onDelete: t }) {
  return a(Cre, {
    as: "li",
    children: y("div", {
      css: xre,
      children: [
        a(ne, {
          typography: "h6",
          color: M.grey800,
          fontWeight: "semibold",
          css: [
            {
              marginLeft: "20px",
            },
            oU,
          ],
          children: e.title,
        }),
        a(he, {
          type: "danger",
          size: "large",
          style: "fill",
          onClick: () => t(e),
          children: "삭제",
        }),
      ],
    }),
  });
}

function GFs({ item: e, onEdit: t }) {
  var c;
  const [n, r] = q("normal"),
    [i, o] = q(
      ((c = e.titleI18n) == null ? void 0 : c.languages["en-US"]) ?? "",
    ),
    s = ht(),
    u = i.length > 20,
    l = () => {
      if (u) {
        s.open({
          icon: "icn-warning-color",
          message: "20자 이내로 작성해주세요!",
          position: "top",
        });
        return;
      }
      (t(i.trim()), r("normal"));
    };
  return a(Cre, {
    as: "li",
    "aria-label": `${e.title} 영어 이름 수정`,
    children: a("div", {
      css: [
        xre,
        {
          display: "block",
        },
      ],
      children: te(n)
        .with("normal", () =>
          y(I.Vertical, {
            gutter: 5,
            children: [
              a(ne, {
                typography: "h7",
                color: M.grey800,
                fontWeight: "semibold",
                css: [oU],
                children: e.title,
              }),
              y(I.Horizontal, {
                align: "center",
                css: {
                  width: "100%",
                  justifyContent: "space-between",
                },
                children: [
                  a(ne, {
                    typography: "h7",
                    color: M.grey800,
                    css: [
                      oU,
                      {
                        marginBottom: 3,
                      },
                    ],
                    children: i,
                  }),
                  a(W, {
                    click: {
                      schemaId: Wt.카테고리_편집_카테고리_수정_버튼_클릭,
                    },
                    params: {
                      categoryId: e.id,
                      categoryTitle: e.title,
                      language: "en-US",
                    },
                    children: a(he, {
                      type: "dark",
                      size: "large",
                      style: "weak",
                      css: {
                        alignSelf: "end",
                      },
                      onClick: () => r("edit"),
                      children: "수정",
                    }),
                  }),
                ],
              }),
            ],
          }),
        )
        .with("edit", () =>
          y(I.Vertical, {
            gutter: 4,
            children: [
              a(ne, {
                typography: "h7",
                color: M.grey800,
                fontWeight: "semibold",
                css: [oU],
                children: e.title,
              }),
              y(I.Horizontal, {
                align: "center",
                gutter: 10,
                css: {
                  width: "100%",
                  justifyContent: "space-between",
                },
                children: [
                  a(Me, {
                    css: {
                      flex: 1,
                    },
                    children: a(Me.TextField, {
                      value: i,
                      onChange: (d) => o(d.target.value),
                      onKeyPress: (d) => {
                        d.key === "Enter" && i.trim().length > 0 && l();
                      },
                      error: u,
                    }),
                  }),
                  a(W, {
                    click: {
                      schemaId: Wt.카테고리_편집_카테고리_수정_저장_버튼_클릭,
                    },
                    params: {
                      categoryId: e.id,
                      categoryTitle: M4(e.titleI18n, {
                        language: "en-US",
                      }),
                      language: "en-US",
                    },
                    children: a(he, {
                      type: "primary",
                      size: "large",
                      style: "weak",
                      disabled: i.trim().length === 0,
                      onClick: l,
                      children: "저장",
                    }),
                  }),
                ],
              }),
            ],
          }),
        )
        .exhaustive(),
    }),
  });
}

function qFs({ item: e, disabled: t = !1, onEdit: n }) {
  const [r, i] = q("normal"),
    [o, s] = q(e.title),
    u = ht(),
    l = o.length > 20,
    c = () => {
      if (l) {
        u.open({
          icon: "icn-warning-color",
          message: "20자 이내로 작성해주세요!",
          position: "top",
        });
        return;
      }
      (n(o.trim()), i("normal"));
    };
  return a(Cre, {
    as: "li",
    children: a("div", {
      css: xre,
      children: te(r)
        .with("normal", () =>
          y(Q, {
            children: [
              a(ne, {
                typography: "h6",
                color: M.grey800,
                fontWeight: "semibold",
                css: [
                  {
                    marginLeft: "20px",
                  },
                  oU,
                ],
                children: o,
              }),
              a(W, {
                click: {
                  schemaId: Wt.카테고리_편집_카테고리_수정_버튼_클릭,
                },
                params: {
                  categoryId: e.id,
                  categoryTitle: e.title,
                  language: "ko-KR",
                },
                children: a(he, {
                  type: "dark",
                  size: "large",
                  style: "weak",
                  disabled: t,
                  onClick: () => i("edit"),
                  children: "수정",
                }),
              }),
            ],
          }),
        )
        .with("edit", () =>
          y(Q, {
            children: [
              a(Me, {
                children: a(Me.TextField, {
                  autoFocus: !0,
                  value: o,
                  onChange: (d) => s(d.target.value),
                  onKeyPress: (d) => {
                    d.key === "Enter" && o.trim().length > 0 && c();
                  },
                  error: l,
                }),
              }),
              a(W, {
                click: {
                  schemaId: Wt.카테고리_편집_카테고리_수정_저장_버튼_클릭,
                },
                params: {
                  categoryId: e.id,
                  categoryTitle: e.title,
                  language: "ko-KR",
                },
                children: a(he, {
                  type: "primary",
                  size: "large",
                  style: "weak",
                  disabled: o.trim().length === 0,
                  onClick: c,
                  children: "저장",
                }),
              }),
            ],
          }),
        )
        .exhaustive(),
    }),
  });
}

function YFs({ item: e, onRegister: t }) {
  const n = ht(),
    [r, i] = q(""),
    o = r.length > 20;
  return a(Cre, {
    as: "li",
    "aria-label": `${e.title} 영어 이름 등록`,
    children: y("div", {
      css: xre,
      children: [
        y(I.Vertical, {
          gutter: 8,
          children: [
            a(ne, {
              typography: "h7",
              color: M.grey800,
              fontWeight: "semibold",
              css: [oU],
              children: e.title,
            }),
            a(Me, {
              css: {
                width: "100%",
              },
              children: a(Me.TextField, {
                placeholder: "영어로 작성해 주세요",
                value: r,
                onChange: (s) => i(s.target.value),
                error: o,
              }),
            }),
          ],
        }),
        a(W, {
          click: {
            schemaId: Wt.카테고리_편집_새카테고리_추가_버튼_클릭,
          },
          params: {
            categoryTitle: r,
            language: "en-US",
          },
          children: a(he, {
            type: "primary",
            size: "large",
            style: "weak",
            disabled: r.trim().length === 0,
            css: {
              alignSelf: "end",
            },
            onClick: () => {
              if (o) {
                n.open({
                  icon: "icn-warning-color",
                  message: "20자 이내로 작성해주세요!",
                  position: "top",
                });
                return;
              }
              (t(r.trim()), i(""));
            },
            children: "저장",
          }),
        }),
      ],
    }),
  });
}

function KFs({ onRegister: e }) {
  const t = ht(),
    [n, r] = q(""),
    i = n.length > 20;
  return a(Cre, {
    children: y("div", {
      css: xre,
      children: [
        a(Me, {
          children: a(Me.TextField, {
            placeholder: "새로운 카테고리 이름",
            value: n,
            onChange: (o) => r(o.target.value),
            error: i,
          }),
        }),
        a(W, {
          click: {
            schemaId: Wt.카테고리_편집_새카테고리_추가_버튼_클릭,
          },
          params: {
            categoryTitle: n,
            language: "ko-KR",
          },
          children: a(he, {
            type: "primary",
            size: "large",
            style: "weak",
            disabled: n.trim().length === 0,
            onClick: () => {
              if (i) {
                t.open({
                  icon: "icn-warning-color",
                  message: "20자 이내로 작성해주세요!",
                  position: "top",
                });
                return;
              }
              (e(n.trim()), r(""));
            },
            children: "저장",
          }),
        }),
      ],
    }),
  });
}

function XFs({ item: e, selected: t, rightAddon: n, onSelect: r }) {
  return a(Cre, {
    as: "li",
    css: [
      t
        ? {
            backgroundColor: M.grey200,
          }
        : void 0,
    ],
    children: a(ir, {
      schemaId: Wt.카테고리_순서편집_카테고리_선택,
      params: {
        categoryId: e.id,
        categoryTitle: e.title,
        action: t ? "unselect" : "select",
      },
      children: y("div", {
        css: [xre],
        onClick: () => r(e.id),
        children: [
          y(ne, {
            typography: "h6",
            color: M.grey800,
            fontWeight: "semibold",
            css: [
              {
                display: "inline-flex",
                alignItems: "center",
                marginLeft: 20,
              },
              oU,
            ],
            children: [e.title, n],
          }),
          a(ta, {
            inline: !0,
            checked: t,
            readOnly: !0,
            css: {
              marginRight: 22,
            },
          }),
        ],
      }),
    }),
  });
}
const $ee = {
    RegisterMode: KFs,
    RegisterForeignNameMode: YFs,
    EditTitleMode: qFs,
    EditForeignNameMode: GFs,
    DeleteMode: jFs,
    Selectable: XFs,
  },
  QFs = 92;

function ZFs({ onBack: e, onClose: t }) {
  const n = ht(),
    r = p0(),
    i = HFs(),
    o = async (s) => {
      try {
        await i(s);
      } catch (u) {
        if (Yn(u) && u.errorCode === "4000") {
          n.open({
            icon: "icn-warning-color",
            message: "카테고리 내 상품이 있어서 삭제할 수 없어요",
            position: "top",
          });
          return;
        }
        throw u;
      }
    };
  return y(Q, {
    children: [
      a(xe.CloseButton, {
        onClick: t,
        disableDialogClose: !0,
      }),
      a(H.CenterVertical, {
        justify: "space-between",
        css: {
          height: QFs,
          padding: "40px 100px 18px 60px",
        },
        children: a(xe.Title, {
          children: y(I.Horizontal, {
            align: "center",
            gutter: 10,
            css: {
              marginLeft: -14,
            },
            children: [
              a(xe.BackButton, {
                onClick: e,
                iconColor: _.grey400,
              }),
              a(ne, {
                typography: "h6",
                fontWeight: "semibold",
                color: _.grey800,
                children: "카테고리 삭제",
              }),
            ],
          }),
        }),
      }),
      a(xe.Scrollable, {
        css: {
          padding: "0 25px 0 60px",
        },
        children: a("ul", {
          css: [Bc],
          children: r.map((s) =>
            a(
              $ee.DeleteMode,
              {
                item: s,
                onDelete: o,
              },
              s.id,
            ),
          ),
        }),
      }),
    ],
  });
}
async function uVe(e) {
  return (
    await Se.put("/api/pos/v1/catalog/categories/bulk", {
      json: {
        categories: e,
      },
    })
  ).categories;
}
async function JFs(e) {
  return await Se.post("/api/pos/v1/catalog/categories", {
    json: e,
  });
}

function e$s() {
  const e = ht(),
    t = async (n) => {
      try {
        const r = await JFs({
          title: n,
        });
        bre((i = []) => [...i, r]);
      } catch (r) {
        if (Yn(r) && r.errorCode === "4000") {
          e.open({
            icon: "icn-warning-color",
            message: "중복되는 이름의 카테고리가 있어요!",
            position: "top",
          });
          return;
        }
        throw r;
      }
    };
  return a($ee.RegisterMode, {
    onRegister: t,
  });
}
const t$s = 92;

function n$s({
  onEditOrder: e,
  onEditForeignName: t,
  onDelete: n,
  onClose: r,
}) {
  var c;
  const i = ht(),
    o = p0(),
    { data: s } = Ed(),
    u = ((c = s.franchise) == null ? void 0 : c.catalogManagement) === !0,
    l = async (d, h) => {
      try {
        const p = {
            ...d,
            title: h,
          },
          f = await uVe([p]);
        bre((g = []) => Bbe(g, f, (m, v) => m.id === v.id));
      } catch (p) {
        if (Yn(p) && p.errorCode === "4000") {
          i.open({
            icon: "icn-warning-color",
            message: "중복되는 이름의 카테고리가 있어요!",
            position: "top",
          });
          return;
        }
        throw p;
      }
    };
  return y(W, {
    screen: {
      schemaId: Wt.카테고리_편집_다이얼로그,
    },
    params: {
      language: "ko-KR",
    },
    children: [
      a(xe.CloseButton, {
        onClick: r,
      }),
      y(H, {
        align: "flex-end",
        justify: "space-between",
        css: {
          height: t$s,
          padding: "40px 100px 20px 60px",
        },
        children: [
          a(xe.Title, {
            children: a(ne, {
              typography: "h6",
              fontWeight: "semibold",
              color: _.grey800,
              children: "카테고리 관리",
            }),
          }),
          y(I.Horizontal, {
            gutter: 30,
            align: "center",
            children: [
              !u &&
                y(Q, {
                  children: [
                    a(W, {
                      click: {
                        schemaId: Wt.카테고리_편집_상단메뉴_버튼_클릭,
                      },
                      params: {
                        text: "삭제",
                      },
                      children: a(qd, {
                        onClick: n,
                        children: "삭제",
                      }),
                    }),
                    a(W, {
                      click: {
                        schemaId: Wt.카테고리_편집_상단메뉴_버튼_클릭,
                      },
                      params: {
                        text: "영어 표기",
                      },
                      children: a(qd, {
                        onClick: t,
                        children: "영어 표기",
                      }),
                    }),
                  ],
                }),
              a(W, {
                click: {
                  schemaId: Wt.카테고리_편집_상단메뉴_버튼_클릭,
                },
                params: {
                  text: "순서 편집",
                },
                children: a(qd, {
                  onClick: e,
                  children: "순서편집",
                }),
              }),
            ],
          }),
        ],
      }),
      y(xe.Scrollable, {
        css: {
          padding: "0 25px 0 60px",
        },
        children: [
          !u && a(e$s, {}),
          a("ul", {
            css: [Bc],
            children: o.map((d) =>
              a(
                $ee.EditTitleMode,
                {
                  item: d,
                  disabled: u,
                  onEdit: (h) => l(d, h),
                },
                d.id,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}

function r$s({
  showBackButton: e = !0,
  exitBehavior: t = "back",
  onBack: n,
  onClose: r,
}) {
  const i = p0(),
    o = async (c, d) => {
      const h = await uVe([
        {
          ...c,
          titleI18n: {
            languages: {
              "en-US": d,
            },
          },
        },
      ]);
      bre((p = []) => Bbe(p, h, (f, g) => f.id === g.id));
    },
    s = () => {
      switch (t) {
        case "back":
          n();
          break;
        case "close":
          r();
          break;
      }
    },
    u = async () => {
      s();
    },
    l = async () => {
      r();
    };
  return y(W, {
    screen: {
      schemaId: Wt.카테고리_편집_다이얼로그,
    },
    params: {
      language: "en-US",
    },
    children: [
      a(xe.CloseButton, {
        onClick: l,
        disableDialogClose: !0,
      }),
      a(I.Vertical, {
        gutter: 21,
        align: "stretch",
        css: {
          padding: "40px 80px 20px 60px",
        },
        children: a(H.CenterVertical, {
          align: "center",
          justify: "space-between",
          children: a(xe.Title, {
            children: y(I.Horizontal, {
              align: "center",
              gutter: 10,
              css: {
                marginLeft: -14,
              },
              children: [
                e
                  ? a(xe.BackButton, {
                      onClick: u,
                      iconColor: _.grey400,
                    })
                  : null,
                a(ne, {
                  typography: "h6",
                  fontWeight: "semibold",
                  color: _.grey800,
                  children: "카테고리 영어 표기",
                }),
                a(ne, {
                  typography: "xsmall",
                  color: _.grey600,
                  css: {
                    transform: "translateY(3px)",
                  },
                  children: "키오스크에서 English를 누르면 보이는 이름이에요.",
                }),
              ],
            }),
          }),
        }),
      }),
      a("div", {
        css: {
          position: "relative",
          flex: 1,
          overflow: "auto",
        },
        children: a(xe.Scrollable, {
          css: {
            padding: "0 25px 0 60px",
          },
          children: y("ul", {
            css: [Bc],
            children: [
              i
                .filter((c) => {
                  var d, h;
                  return Gt(
                    (h = (d = c.titleI18n) == null ? void 0 : d.languages) ==
                      null
                      ? void 0
                      : h["en-US"],
                  );
                })
                .map((c) =>
                  a(
                    $ee.RegisterForeignNameMode,
                    {
                      item: c,
                      onRegister: async (d) => {
                        await o(c, d);
                      },
                    },
                    c.id,
                  ),
                ),
              i
                .filter((c) => {
                  var d, h;
                  return !Gt(
                    (h = (d = c.titleI18n) == null ? void 0 : d.languages) ==
                      null
                      ? void 0
                      : h["en-US"],
                  );
                })
                .map((c) =>
                  a(
                    $ee.EditForeignNameMode,
                    {
                      item: c,
                      onEdit: async (d) => {
                        await o(c, d);
                      },
                    },
                    c.id,
                  ),
                ),
            ],
          }),
        }),
      }),
    ],
  });
}

function wre({ item: e, size: t = "large", className: n }) {
  return e.franchiseNewBadge
    ? a(Np, {
        size: t,
        variant: "weak",
        color: "red",
        className: n,
        children: "신규",
      })
    : e.franchiseUpdateBadge
      ? a(Np, {
          size: t,
          variant: "weak",
          color: "green",
          className: n,
          children: "수정",
        })
      : null;
}

function Tpr() {
  const { data: e } = Tn(),
    { mutateAsync: t } = Wg(),
    n = me(() => {
      var i;
      return ((i = e.catalog) == null ? void 0 : i.favoriteMenuOrder) ?? 0;
    }, [e]),
    r = K(
      async (i) => {
        await t({
          catalog: {
            favoriteMenuOrder: i,
          },
        });
      },
      [t],
    );
  return {
    favoriteMenuOrder: n,
    updateFavoriteMenuOrder: r,
  };
}

function Bpr() {
  const { data: e } = Tn(),
    { mutateAsync: t } = Wg(),
    n = me(() => {
      var i, o;
      return ((i = e.prepaidVoucher) == null
        ? void 0
        : i.prepaidVoucherMenuOrder) != null
        ? e.prepaidVoucher.prepaidVoucherMenuOrder
        : ((o = e.business) == null ? void 0 : o.type) === "SERVICE"
          ? 1
          : -1;
    }, [e]),
    r = K(
      async (i) => {
        await t({
          prepaidVoucher: {
            prepaidVoucherMenuOrder: i,
          },
        });
      },
      [t],
    );
  return {
    prepaidVoucherMenuOrder: n,
    updatePrepaidVoucherMenuOrder: r,
  };
}

function TG() {
  var t;
  const { data: e } = Ed();
  return ((t = e.kiosk) == null ? void 0 : t.kioskManagementEnabled) === !0;
}

function Spr({
  queryMode: e = "view",
  prepaidVoucherMenuEnabled: t = !0,
} = {}) {
  var d, h;
  const { data: n } = Tn(),
    { showFavoriteMenu: r } = sVe(),
    { favoriteMenuOrder: i } = Tpr(),
    {
      data: {
        categorySetting: { isPosEnabled: o },
      },
    } = st({
      ...qs.settings,
    }),
    { prepaidVoucherMenuOrder: s } = Bpr(),
    {
      data: { isActivePrepaidVoucher: u },
    } = ao(),
    l = p0();
  return me(() => {
    var f, g;
    let p = [...l];
    return (
      (r || e === "edit") && (p = ySe(p, i, G6)),
      ((f = n.operation) == null ? void 0 : f.payment.type) === "PAY_FIRST" &&
        ((t && o) || e === "edit") &&
        (((g = n.business) == null ? void 0 : g.type) === "SERVICE" || u) &&
        (p = s === -1 ? [...p, vS] : ySe(p, s, vS)),
      p
    );
  }, [
    e,
    l,
    r,
    t,
    (d = n.operation) == null ? void 0 : d.payment.type,
    (h = n.business) == null ? void 0 : h.type,
    o,
    i,
    u,
    s,
  ]);
}

function i$s() {
  const { showFavoriteMenu: e, setShowFavoriteMenu: t } = sVe();
  return a(W, {
    click: {
      schemaId: Wt.카테고리_순서편집_즐겨찾기_사용_토글_클릭,
      params: {
        actionYn: e,
      },
    },
    children: a(ZC, {
      checked: e,
      onChange: (n) => t(n.target.checked),
      "aria-label": "사용여부",
      labelOn: "사용",
      labelOff: "사용안함",
      size: "medium",
      css: o$s,
    }),
  });
}
const o$s = V({
    "& > label": {
      marginBottom: 0,
    },
  }),
  a$s = 117,
  s$s = 165,
  u$s = 107;

function l$s({
  showBackButton: e = !0,
  exitBehavior: t = "back",
  onBack: n,
  onClose: r,
}) {
  var T;
  const i = TG(),
    { data: o } = Tn(),
    { updateFavoriteMenuOrder: s } = Tpr(),
    { showFavoriteMenu: u } = sVe(),
    { updatePrepaidVoucherMenuOrder: l } = Bpr(),
    c = ((T = o.operation) == null ? void 0 : T.payment.type) === "PAY_LATER",
    d = Spr({
      queryMode: "edit",
    }),
    [h, p] = q(d),
    [f, g] = q(),
    { openConfirm: m } = gn(),
    { mutateAsync: v, isPending: b } = lt({
      mutationFn: async () => {
        const B = h.findIndex((O) => O.id === G6.id);
        if ((await s(B), c === !1)) {
          const O = h.findIndex((P) => P.id === vS.id);
          await l(O);
        }
        const S = h
            .filter((O) => ![G6.id, vS.id].includes(O.id))
            .map((O, P) => ({
              ...O,
              order: P,
            })),
          F = await uVe(S);
        bre(F);
      },
    }),
    C = async () => {
      if (d$s(d, h)) {
        const S = `저장버튼을 누르지 않으면 
수정내용이 삭제돼요.`;
        ye.log(Wt.카테고리_순서편집_저장확인얼랏, {
          title: S,
        });
        const F = await m({
          title: S,
          cancelButton: a(he, {
            type: "danger",
            style: "weak",
            children: "삭제",
          }),
          confirmButton: "저장",
        });
        (ye.log(Wt.카테고리_순서편집_저장확인얼랏_CTA버튼_클릭, {
          button: F ? "저장" : "삭제",
        }),
          F && (await v()));
      }
    },
    x = () => {
      switch (t) {
        case "back":
          n();
          break;
        case "close":
          r();
          break;
      }
    },
    w = async () => {
      (await C(), x());
    },
    A = async () => {
      (await C(), r());
    },
    E = async () => {
      (await v(), x());
    };
  return y(W, {
    screen: {
      schemaId: Wt.카테고리_순서편집_다이얼로그,
    },
    children: [
      a(xe.CloseButton, {
        onClick: A,
        disableDialogClose: !0,
      }),
      y(I.Vertical, {
        gutter: 21,
        align: "stretch",
        css: {
          height: i ? s$s : a$s,
          padding: "40px 100px 20px 60px",
        },
        children: [
          y(H.CenterVertical, {
            align: "start",
            justify: "space-between",
            children: [
              a(xe.Title, {
                children: y(I.Horizontal, {
                  align: "center",
                  gutter: 10,
                  css: {
                    marginLeft: -14,
                  },
                  children: [
                    e
                      ? a(W, {
                          click: {
                            schemaId: Wt.카테고리_순서편집_뒤로가기_버튼_클릭,
                          },
                          children: a(xe.BackButton, {
                            onClick: w,
                            iconColor: _.grey400,
                          }),
                        })
                      : null,
                    a(ne, {
                      typography: "h6",
                      fontWeight: "semibold",
                      color: _.grey800,
                      children: "카테고리 순서편집",
                    }),
                  ],
                }),
              }),
              a(c$s, {
                categories: h,
                selectedId: f,
                onChange: p,
              }),
            ],
          }),
          i
            ? a(ne, {
                typography: "h7",
                color: _.grey600,
                css: {
                  marginTop: 18,
                  marginLeft: 16,
                },
                children: "포스와 키오스크 둘 다 반영되어요",
              })
            : null,
        ],
      }),
      a("div", {
        css: {
          position: "relative",
          flex: 1,
          overflow: "auto",
        },
        children: a(xe.Scrollable, {
          css: {
            padding: "0 25px 0 60px",
          },
          children: a("ul", {
            css: [Bc],
            children: h.map((B) =>
              a(
                $ee.Selectable,
                {
                  item: B,
                  selected: f === B.id,
                  rightAddon: te(B)
                    .with(
                      {
                        id: G6.id,
                      },
                      () =>
                        y(H, {
                          justify: "space-between",
                          align: "center",
                          css: {
                            width: "100%",
                            marginLeft: 8,
                          },
                          children: [
                            i
                              ? null
                              : a(Di, {
                                  style: "weak",
                                  type: "elephant",
                                  size: "small",
                                  css: {
                                    marginLeft: 8,
                                  },
                                  children: "포스에만 노출됨",
                                }),
                            a(i$s, {}),
                          ],
                        }),
                    )
                    .with(
                      {
                        id: vS.id,
                      },
                      () =>
                        a(H, {
                          justify: "space-between",
                          align: "center",
                          css: {
                            width: "100%",
                            marginLeft: 8,
                          },
                          children: i
                            ? null
                            : a(Di, {
                                style: "weak",
                                type: "elephant",
                                size: "small",
                                css: {
                                  marginLeft: 8,
                                },
                                children: "포스에만 노출됨",
                              }),
                        }),
                    )
                    .otherwise(() =>
                      a(wre, {
                        css: {
                          marginLeft: 10,
                        },
                        item: B,
                      }),
                    ),
                  onSelect: () => {
                    f === B.id ? g(void 0) : g(B.id);
                  },
                },
                B.id,
              ),
            ),
          }),
        }),
      }),
      a(xe.BottomActions, {
        css: {
          height: u$s,
          padding: "22px 100px",
        },
        children: y(I.Horizontal, {
          justify: "flex-end",
          gutter: 12,
          css: $e,
          children: [
            a(W, {
              click: {
                schemaId: Wt.카테고리_순서편집_CTA버튼_클릭,
              },
              params: {
                button: "취소",
                bookmarkYn: u,
              },
              children: a(Ye, {
                size: "xlarge",
                disabled: b,
                onClick: w,
                children: "취소",
              }),
            }),
            a(W, {
              click: {
                schemaId: Wt.카테고리_순서편집_CTA버튼_클릭,
              },
              params: {
                button: "저장",
                bookmarkYn: u,
              },
              children: a(Ye, {
                type: "primary",
                size: "xlarge",
                css: {
                  minWidth: 160,
                },
                loading: b,
                onClick: E,
                children: "저장",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}

function c$s({ categories: e, selectedId: t, onChange: n }) {
  const r = e.findIndex((l) => l.id === t),
    i = t != null && r > 0,
    o = t != null && r < e.length - 1,
    s = () => {
      n(one(e, r));
    },
    u = () => {
      n(ane(e, r));
    };
  return y(I.Horizontal, {
    gutter: 8,
    children: [
      a(W, {
        click: {
          schemaId: Wt.카테고리_순서편집_위로_버튼_클릭,
        },
        children: a(Ye, {
          leftAddon: a(xn, {
            name: "icon-arrow-increase",
          }),
          type: "primary",
          variant: "weak",
          disabled: !i,
          onClick: s,
          children: "위로",
        }),
      }),
      a(W, {
        click: {
          schemaId: Wt.카테고리_순서편집_아래로_버튼_클릭,
        },
        children: a(Ye, {
          leftAddon: a(xn, {
            name: "icon-arrow-decrease",
          }),
          type: "primary",
          variant: "weak",
          disabled: !o,
          onClick: u,
          children: "아래로",
        }),
      }),
    ],
  });
}

function d$s(e, t) {
  return JSON.stringify(e) !== JSON.stringify(t);
}

function gxe() {
  return K(
    (e) =>
      new Promise((t) => {
        yn.open(({ isOpen: n, unmount: r }) =>
          a(Oe, {
            fallback: null,
            children: a(h$s, {
              open: n,
              onClose: () => {
                (t(), r());
              },
              ...e,
            }),
          }),
        );
      }),
    [],
  );
}

function h$s({ mode: e = "modify", open: t, onClose: n }) {
  const [r, i] = q(e);
  return a(xe, {
    onClose: n,
    open: t,
    children: a(F1, {
      value: r,
      caseBy: {
        modify: a(n$s, {
          onEditOrder: () => i("editOrder"),
          onEditForeignName: () => i("editForeignNames"),
          onDelete: () => i("delete"),
          onClose: n,
        }),
        editOrder: a(l$s, {
          showBackButton: e !== "editOrder",
          exitBehavior: e === "editOrder" ? "close" : "back",
          onBack: () => i("modify"),
          onClose: n,
        }),
        editForeignNames: a(r$s, {
          showBackButton: e !== "editForeignNames",
          exitBehavior: e === "editOrder" ? "close" : "back",
          onBack: () => i("modify"),
          onClose: n,
        }),
        delete: a(ZFs, {
          onBack: () => i("modify"),
          onClose: n,
        }),
      },
    }),
  });
}

function kpr({
  expiry: e = 30,
  size: t,
  variant: n = "weak",
  theme: r = "red",
  children: i,
  className: o,
  ...s
}) {
  return me(
    () =>
      s.type === "release_date"
        ? (Ht(
            s.releaseDate != null,
            "type이 release_date인 경우 releaseDate를 지정해야 합니다.",
          ),
          Of(new Date(), Ue(s.releaseDate, "yyyy-MM-dd")) > e)
        : (Ht(
            s.featureKey != null,
            "type이 first_seen인 경우 featureKey를 지정해야 합니다.",
          ),
          E7.until({
            key: s.featureKey,
            days: e,
          }).shouldShow() === !1),
    [e, s],
  )
    ? null
    : a(ai, {
        variant: n,
        theme: r,
        size: t,
        className: o,
        ...s,
        children: i,
      });
}
const Fpr = _n({
  onSelect: () => {},
});

function XFe({
  children: e,
  onChange: t,
  selectedValue: n,
  role: r = "tablist",
  ...i
}) {
  const o = (s) => {
    t == null || t(s);
  };
  return a(Fpr.Provider, {
    value: {
      selectedValue: n,
      onSelect: o,
    },
    children: a("div", {
      role: r,
      css: p$s,
      ...i,
      children: e,
    }),
  });
}
const p$s = V`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 100%;
  overflow-x: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function f$s(
  {
    children: e,
    role: t = "tab",
    disabled: n = !1,
    value: r,
    rightAddon: i,
    onClick: o,
    ...s
  },
  u,
) {
  const { selectedValue: l, onSelect: c } = bt(Fpr),
    d = l === r;
  return y("div", {
    ref: u,
    role: t,
    "aria-disabled": n,
    "aria-selected": d,
    onClick: (h) => {
      if (n) {
        h.preventDefault();
        return;
      }
      (o == null || o(h), c(r));
    },
    css: [g$s, d ? m$s : void 0],
    ...s,
    children: [
      a(ne, {
        typography: "h7",
        fontWeight: "bold",
        color: d ? _.grey900 : _.grey700,
        css: {
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        children: e,
      }),
      i,
    ],
  });
}
const g$s = V`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  height: 57px;
  white-space: nowrap;
  cursor: pointer;

  &[aria-disabled='true'] {
    cursor: default;
  }
`,
  m$s = V`
  &::after {
    display: block;
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: ${_.grey800};
  }
`;
XFe.Item = Z(f$s);

function QFe({
  categories: e,
  pageSize: t = 5,
  rowsCount: n = 1,
  selectedCategoryId: r,
  onSelectCategory: i,
  className: o,
  mode: s = "default",
  rightTopAddon: u,
}) {
  const l = n === 2 ? t + 1 : 0,
    c = t + l,
    d = e.findIndex((x) => x.id === r),
    h = B4(e, c),
    p = Math.floor(d / c),
    [f, g] =
      s === "default" ? e$e(h[p] ?? [], t) : e$e(e, Math.floor(e.length)),
    m = p > 0,
    v = p < h.length - 1,
    b = () => {
      var w, A;
      const x =
        (A = (w = h[p - 1]) == null ? void 0 : w[0]) == null ? void 0 : A.id;
      m && x != null && (i == null || i(x));
    },
    C = () => {
      var w, A;
      const x =
        (A = (w = h[p + 1]) == null ? void 0 : w[0]) == null ? void 0 : A.id;
      v && x != null && (i == null || i(x));
    };
  return y(H, {
    direction: "column",
    align: "stretch",
    className: o,
    children: [
      a(JFe, {
        selectedTab: String(r),
        onChange: (x) => (i == null ? void 0 : i(Number(x))),
        items: f,
        size: t,
        mode: s,
        addon:
          s === "default"
            ? y(H, {
                css: {
                  flex: "none",
                  marginLeft: 6,
                },
                direction: "row",
                align: "center",
                children: [
                  a($pr, {
                    name: "catalog-category-tab-pagination",
                    "aria-label": "카테고리 이동",
                    page: p + 1,
                    isPrevAvailable: m,
                    isNextAvailable: v,
                    onPrev: b,
                    onNext: C,
                  }),
                  u,
                ],
              })
            : a(H, {
                css: {
                  flex: "none",
                  marginLeft: 6,
                },
                direction: "row",
                align: "center",
                children: u,
              }),
      }),
      n === 2
        ? a(JFe, {
            selectedTab: String(r),
            onChange: (x) => (i == null ? void 0 : i(Number(x))),
            items: g,
            size: l,
          })
        : null,
    ],
  });
}
const ZFe = "MODIFY_BUTTON";
QFe.WithModifyButton = function ({
  categories: t,
  pageSize: n = 5,
  rowsCount: r = 1,
  selectedCategoryId: i,
  onSelectCategory: o,
  className: s,
  mode: u = "default",
  rightTopAddon: l,
}) {
  const c = r === 2 ? n + 1 : 0,
    d = n + c,
    h = [...t, ZFe],
    p = B4(h, d),
    [f, g] = q(0),
    [m, v] =
      u === "default" ? e$e(p[f] ?? [], n) : e$e(h, Math.floor(h.length));
  ie(() => {
    if (i != null) {
      const E = t.findIndex((T) => T.id === i);
      g(Math.floor(E / d));
    }
  }, [i, t, d]);
  const b = f > 0,
    C = f < p.length - 1,
    x = (E) => {
      var B;
      const T = (B = p[E]) == null ? void 0 : B[0];
      T != null && T !== ZFe && (o == null || o(T.id));
    },
    w = () => {
      if (b) {
        const E = f - 1;
        (x(E), g(E));
      }
    },
    A = () => {
      if (C) {
        const E = f + 1;
        (x(E), g(E));
      }
    };
  return y(H, {
    direction: "column",
    align: "stretch",
    className: s,
    children: [
      a(JFe, {
        selectedTab: String(i),
        onChange: (E) => (o == null ? void 0 : o(Number(E))),
        items: m,
        size: n,
        mode: u,
        addon:
          u === "default"
            ? y(H, {
                css: {
                  flex: "none",
                  marginLeft: 6,
                },
                direction: "row",
                align: "center",
                children: [
                  a($pr, {
                    name: "catalog-category-tab-pagination",
                    "aria-label": "카테고리 이동",
                    page: f + 1,
                    isPrevAvailable: b,
                    isNextAvailable: C,
                    onPrev: w,
                    onNext: A,
                  }),
                  l,
                ],
              })
            : a(H, {
                css: {
                  flex: "none",
                  marginLeft: 6,
                },
                direction: "row",
                align: "center",
                children: l,
              }),
      }),
      r === 2
        ? a(JFe, {
            selectedTab: String(i),
            onChange: (E) => (o == null ? void 0 : o(Number(E))),
            items: v,
            size: c,
            mode: u,
          })
        : null,
    ],
  });
};
const y$s = V({
  minWidth: 106,
});

function v$s({ onClick: e }) {
  const { data: t } = rx(),
    n = (t == null ? void 0 : t.catalogManagement) === !0;
  return y(XFe.Item, {
    value: "",
    onClick: e,
    children: [" ", n ? "편집" : "추가/편집"],
  });
}

function $pr({
  page: e,
  isPrevAvailable: t,
  isNextAvailable: n,
  onPrev: r,
  onNext: i,
  ...o
}) {
  return y(Vi, {
    variant: "flat",
    ...o,
    children: [
      a(W, {
        click: {
          schemaId: Vt.주문_페이지_카테고리_이전_다음_페이지_보기_클릭,
        },
        params: {
          page: e,
          pageMoveValue: -1,
        },
        children: a(Vi.IconButton, {
          "aria-label": "이전",
          disabled: !t,
          onClick: r,
          children: a(rt, {
            name: "icon-arrow-left-small-mono",
          }),
        }),
      }),
      a(W, {
        click: {
          schemaId: Vt.주문_페이지_카테고리_이전_다음_페이지_보기_클릭,
        },
        params: {
          page: e,
          pageMoveValue: 1,
        },
        children: a(Vi.IconButton, {
          "aria-label": "다음",
          disabled: !n,
          onClick: i,
          children: a(rt, {
            name: "icon-arrow-right-small-mono",
          }),
        }),
      }),
    ],
  });
}
const b$s = (e) =>
    V({
      display: "grid",
      gridTemplateColumns: `repeat(${e}, minmax(0, 1fr))`,
      flex: 1,
      overflowY: "hidden",
    }),
  C$s = V({
    overflowX: "auto",
    flex: 1,
    overflowY: "hidden",
  });

function JFe({
  selectedTab: e,
  onChange: t,
  items: n,
  size: r,
  addon: i,
  className: o,
  mode: s = "default",
}) {
  const u = gxe();
  return y(H, {
    align: "center",
    css: {
      borderBottom: `1px solid ${_.grey400}`,
      marginLeft: 20,
      marginRight: 20,
      height: 57,
    },
    className: o,
    children: [
      a(XFe, {
        selectedValue: e,
        onChange: t,
        css: s === "default" ? b$s(r) : C$s,
        children: n.map((l) =>
          l === ZFe
            ? a(
                W,
                {
                  click: {
                    schemaId: Vt.주문_페이지_카테고리_추가_편집_버튼_클릭,
                  },
                  children: a(Oe, {
                    children: a(v$s, {
                      onClick: u,
                    }),
                  }),
                },
                ZFe,
              )
            : a(
                W,
                {
                  click: {
                    schemaId: Vt.주문_페이지_카테고리_클릭,
                    params: {
                      categoryId: l.id,
                      categoryTitle: l.title,
                    },
                  },
                  children: a(XFe.Item, {
                    "data-tour-id": "카테고리 아이템",
                    value: String(l.id),
                    rightAddon:
                      l.id === vS.id
                        ? a(kpr, {
                            type: "first_seen",
                            featureKey: "CatalogCategoryTabRow::PrepaidVoucher",
                            size: "small",
                            css: {
                              marginLeft: 7,
                            },
                            children: "N",
                          })
                        : null,
                    css: s === "scroll" ? y$s : void 0,
                    children: l.title,
                  }),
                },
                l.id,
              ),
        ),
      }),
      i,
    ],
  });
}

function e$e(e, t) {
  const n = e.slice(0, t),
    r = e.slice(t, e.length);
  return [n, r];
}
const x$s = (e) => {
  e.sort((t, n) =>
    t.position > n.position ? 1 : t.position < n.position ? -1 : 0,
  );
};

function D4e(e, t, n) {
  return t === n
    ? e
    : mn(e, (r) => {
        const i = r.find((s) => s.position === t),
          o = r.find((s) => s.position === n);
        (i == null && o != null
          ? (o.position = t)
          : i != null && o == null
            ? (i.position = n)
            : i != null && o != null && ((i.position = n), (o.position = t)),
          x$s(r));
      });
}

function w$s(e) {
  return e != null && typeof (e == null ? void 0 : e.position) == "number";
}

function _$s(
  {
    parent: e,
    positioned: t = !0,
    items: n,
    pageSize: r,
    minPageLength: i,
    initialPage: o = 0,
    children: s,
  },
  u,
) {
  const l = A$s(n, t, {
      pageSize: r,
      minPageLength: i,
    }),
    [c, d] = q(o),
    h = de(),
    p = l.length - 1;
  ie(() => {
    (h.current === "first" && (d(0), (h.current = void 0)),
      h.current === "last" && (d(p), (h.current = void 0)));
  }, [n, p]);
  const f = c > 0 || ((e == null ? void 0 : e.isPrevAvailable) ?? !1),
    g = c < p || ((e == null ? void 0 : e.isNextAvailable) ?? !1),
    m = de(new Set());
  ie(
    () => () => {
      m.current.clear();
    },
    [],
  );
  const v = K((F) => {
      m.current.forEach((O) => {
        O(F);
      });
    }, []),
    b = K((F) => {
      m.current.add(F);
    }, []),
    C = K((F) => {
      m.current.delete(F);
    }, []),
    x = K(
      (F, O = !0) => {
        0 <= F && F <= p && (d(F), O && v("go"));
      },
      [p, v],
    ),
    w = K(
      (F = !0) => {
        (d(0), F && v("go"));
      },
      [v],
    ),
    A = K(
      (F = !0) => {
        (d(p), F && v("go"));
      },
      [p, v],
    ),
    E = K(
      (F = !0) => {
        f &&
          (c > 0
            ? (d(c - 1), F && v("prev"))
            : (e == null || e.prev(!1), (h.current = "last")));
      },
      [f, c, e, v],
    ),
    T = K(
      (F = !0) => {
        g &&
          (c < p
            ? (d(c + 1), F && v("next"))
            : (e == null || e.next(!1), (h.current = "first")));
      },
      [g, p, c, e, v],
    ),
    B = me(
      () => ({
        page: c,
        totalPageLength: l.length,
        isPrevAvailable: f,
        isNextAvailable: g,
        prev: E,
        next: T,
        go: x,
        goFirst: w,
        goLast: A,
        on: b,
        off: C,
      }),
      [c, l, f, g, E, T, x, w, A, b, C],
    );
  (ma(u, () => B),
    ie(() => {
      if (e == null) return;
      const F = () => {
        w();
      };
      return (
        e.on(F),
        () => {
          e.off(F);
        }
      );
    }, [e, A, w]));
  const S = (l == null ? void 0 : l[c]) ?? [];
  return a(Q, {
    children: s({
      itemsChunk: S,
      controls: B,
    }),
  });
}
const N0t = Z(_$s);

function A$s(e, t, { pageSize: n, minPageLength: r = 1 }) {
  if (t) {
    const i = e.map((l, c) =>
        w$s(l)
          ? l
          : {
              ...l,
              position: c + 1,
            },
      ),
      o = e.length > 0 ? Math.max(...i.map((l) => l.position)) : 1,
      s = E$s({
        maxPosition: o,
        pageSize: n,
        minPageLength: r,
      }),
      u = L0(s).map((l) => {
        const c = l + 1;
        return i.find((h) => h.position === c);
      });
    return B4(u, n);
  }
  return B4(e, n);
}

function E$s({ maxPosition: e, pageSize: t, minPageLength: n }) {
  const r = t * n;
  return e === 0 ? r : Math.max((Math.floor((e - 1) / t) + 1) * t, r);
}
const Ipr = _n({}),
  D$s = () => bt(Ipr);

function T$s({ paginatedControls: e, goToItem: t, children: n }) {
  return a(Ipr.Provider, {
    value: {
      paginatedControls: e,
      goToItem: t,
    },
    children: n,
  });
}
