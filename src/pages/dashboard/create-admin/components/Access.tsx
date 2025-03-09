import React from "react";
import Accordion from "@/components/accordion";

interface access {
  selectedValues: any;
  handleCheckboxChange: any;
}
export default function Access({
  selectedValues,
  handleCheckboxChange,
}: access) {
  return (
    <div className="card border p-4 border-gray-300">
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              name="selectAll"
              checked={!!selectedValues["Main Admin"]}
              onChange={() =>
                handleCheckboxChange("Main Admin", "All", "Main Admin")
              }
            />
            Main Admin
          </div>
        }
      />

      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              name="selectAll"
              checked={!!selectedValues["Dashboard"]}
              onChange={() =>
                handleCheckboxChange("Dashboard", "All", "Dashboard")
              }
            />
            Dashboard
          </div>
        }
        content={
          <div>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      !!selectedValues["Dashboard"]?.["View"]?.has("View")
                    }
                    onChange={() =>
                      handleCheckboxChange("Dashboard", "View", "View")
                    }
                  />
                  View
                </label>
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              name="selectAll"
              checked={!!selectedValues["Monthly Pay Track"]}
              onChange={() =>
                handleCheckboxChange(
                  "Monthly Pay Track",
                  "All",
                  "Monthly Pay Track"
                )
              }
            />
            Monthly Pay Track
          </div>
        }
        content={
          <div>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={
                      !!selectedValues["Monthly Pay Track"]?.["View"]?.has(
                        "View"
                      )
                    }
                    onChange={() =>
                      handleCheckboxChange("Monthly Pay Track", "View", "View")
                    }
                  />
                  View
                </label>
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              name="selectAll"
              checked={!!selectedValues["Institute"]}
              onChange={() =>
                handleCheckboxChange("Institute", "All", "Institute")
              }
            />
            Institute
          </div>
        }
        content={
          <div>
            <Accordion
              title={
                <div className="flex items-center justify-center gap-4">
                  View
                </div>
              }
              content={
                <div>
                  <ul>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Institute"]?.["View"]?.has("All")
                          }
                          onChange={() =>
                            handleCheckboxChange("Institute", "View", "All")
                          }
                        />
                        All
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Institute"]?.["View"]?.has(
                              "Course"
                            )
                          }
                          onChange={() =>
                            handleCheckboxChange("Institute", "View", "Course")
                          }
                        />
                        Course
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Institute"]?.["View"]?.has(
                              "Videos"
                            )
                          }
                          onChange={() =>
                            handleCheckboxChange("Institute", "View", "Videos")
                          }
                        />
                        Videos
                      </label>
                    </li>
                  </ul>
                </div>
              }
            />
          </div>
        }
      />

      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              name="selectAll"
              checked={!!selectedValues["Student"]}
              onChange={() => handleCheckboxChange("Student", "All", "Student")}
            />
            Student
          </div>
        }
        content={
          <div>
            <Accordion
              title={
                <div className="flex items-center justify-center gap-4">
                  View
                </div>
              }
              content={
                <div>
                  <ul>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Student"]?.["View"]?.has("All")
                          }
                          onChange={() =>
                            handleCheckboxChange("Student", "View", "All")
                          }
                        />
                        All
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Student"]?.["View"]?.has(
                              "Profile"
                            )
                          }
                          onChange={() =>
                            handleCheckboxChange("Student", "View", "Profile")
                          }
                        />
                        Profile
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Student"]?.["View"]?.has(
                              "Accounting"
                            )
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              "Student",
                              "View",
                              "Accounting"
                            )
                          }
                        />
                        Accounting
                      </label>
                    </li>
                  </ul>
                </div>
              }
            />

            <Accordion
              title={
                <div className="flex items-center justify-center gap-4">
                  Edit
                </div>
              }
              content={
                <div>
                  <ul>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Student"]?.["Edit"]?.has(
                              "Account Delete"
                            )
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              "Student",
                              "Edit",
                              "Account Delete"
                            )
                          }
                        />
                        Account Delete
                      </label>
                    </li>
                  </ul>

                  <Accordion
                    title={
                      <div className="flex items-center justify-center gap-4">
                        Account Active
                      </div>
                    }
                    content={
                      <div>
                        <ul>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedValues["Student"]?.["Edit"]?.has(
                                    "Suspend"
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    "Student",
                                    "Edit",
                                    "Suspend"
                                  )
                                }
                              />
                              Suspend
                            </label>
                          </li>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedValues["Student"]?.["Edit"]?.has(
                                    "Block"
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    "Student",
                                    "Edit",
                                    "Block"
                                  )
                                }
                              />
                              Block
                            </label>
                          </li>
                        </ul>
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        }
      />
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Teacher"]}
              onChange={() => handleCheckboxChange("Teacher", "All", "Teacher")}
            />
            Teacher
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <div>
                  <ul>
                    {[
                      "All",
                      "Profile",
                      "Accounting",
                      "Teaching",
                      "Videos",
                      "Missing class",
                    ].map((item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Teacher"]?.["View"]?.has(item)
                            }
                            onChange={() =>
                              handleCheckboxChange("Teacher", "View", item)
                            }
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />

            <Accordion
              title="Edit"
              content={
                <div>
                  <Accordion
                    title="Profile"
                    content={
                      <ul>
                        <li>
                          <label>
                            <input
                              type="checkbox"
                              checked={
                                !!selectedValues["Teacher"]?.["Edit"]?.has(
                                  "Edit Data"
                                )
                              }
                              onChange={() =>
                                handleCheckboxChange(
                                  "Teacher",
                                  "Edit",
                                  "Edit Data"
                                )
                              }
                            />
                            Edit Data
                          </label>
                        </li>
                      </ul>
                    }
                  />
                  <Accordion
                    title="Teaching"
                    content={
                      <ul>
                        {["Edit", "Delete"].map((item) => (
                          <li key={item}>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedValues["Teacher"]?.["Edit"]?.has(
                                    item
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange("Teacher", "Edit", item)
                                }
                              />
                              {item}
                            </label>
                          </li>
                        ))}
                      </ul>
                    }
                  />

                  <Accordion
                    title="Status"
                    content={
                      <div>
                        <ul>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedValues["Teacher"]?.["Edit"]?.has(
                                    "All"
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange("Teacher", "Edit", "All")
                                }
                              />
                              All
                            </label>
                          </li>
                        </ul>
                        {["Active", "Block", "Suspend", "Update"].map(
                          (status) => (
                            <Accordion
                              key={status}
                              title={status}
                              content={
                                <ul>
                                  {[
                                    "Suspend",
                                    "Block",
                                    "Active",
                                    "Pending",
                                    "Approve",
                                  ].map((option) => (
                                    <li key={option}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={
                                            !!selectedValues["Teacher"]?.[
                                              "Edit"
                                            ]?.has(option)
                                          }
                                          onChange={() =>
                                            handleCheckboxChange(
                                              "Teacher",
                                              "Edit",
                                              option
                                            )
                                          }
                                        />
                                        {option}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              }
                            />
                          )
                        )}
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        }
      />

      {/* Deposit Section */}
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Deposit"]}
              onChange={() => handleCheckboxChange("Deposit", "All", "Deposit")}
            />
            Deposit
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <ul>
                  {["Pending", "Accepted", "Spam"].map((item) => (
                    <li key={item}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Deposit"]?.["View"]?.has(item)
                          }
                          onChange={() =>
                            handleCheckboxChange("Deposit", "View", item)
                          }
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              }
            />

            <Accordion
              title="Edit"
              content={
                <div>
                  <ul>
                    {["All", "Deleted Deposit"].map((item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Deposit"]?.["Edit"]?.has(item)
                            }
                            onChange={() =>
                              handleCheckboxChange("Deposit", "Edit", item)
                            }
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>

                  {["Pending", "Accepted", "Spam"].map((status) => (
                    <Accordion
                      key={status}
                      title={status}
                      content={
                        <ul>
                          {["Accepted", "Spam", "Pending"].map((option) => (
                            <li key={option}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={
                                    !!selectedValues["Deposit"]?.["Edit"]?.has(
                                      option
                                    )
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(
                                      "Deposit",
                                      "Edit",
                                      option
                                    )
                                  }
                                />
                                {option}
                              </label>
                            </li>
                          ))}
                        </ul>
                      }
                    />
                  ))}
                </div>
              }
            />
          </div>
        }
      />

      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Transaction"]}
              onChange={() =>
                handleCheckboxChange("Transaction", "All", "Transaction")
              }
            />
            Transaction
          </div>
        }
        content={
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={
                    !!selectedValues["Transaction"]?.["View"]?.has("View")
                  }
                  onChange={() =>
                    handleCheckboxChange("Transaction", "View", "View")
                  }
                />
                View
              </label>
            </li>
          </ul>
        }
      />

      {/* Menu Section */}
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Menu"]}
              onChange={() => handleCheckboxChange("Menu", "All", "Menu")}
            />
            Menu
          </div>
        }
        content={
          <div>
            {["Home", "Footer", "Menu"].map((section) => (
              <Accordion
                key={section}
                title={section}
                content={
                  <ul>
                    {["View", "Edit", "Delete"].map((action) => (
                      <li key={action}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Menu"]?.[section]?.has(action)
                            }
                            onChange={() =>
                              handleCheckboxChange("Menu", section, action)
                            }
                          />
                          {action}
                        </label>
                      </li>
                    ))}
                  </ul>
                }
              />
            ))}
          </div>
        }
      />

      {/* Course Section */}
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Course"]}
              onChange={() => handleCheckboxChange("Course", "All", "Course")}
            />
            Course
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          !!selectedValues["Course"]?.["View"]?.has("All")
                        }
                        onChange={() =>
                          handleCheckboxChange("Course", "View", "All")
                        }
                      />
                      All
                    </label>
                  </li>
                </ul>
              }
            />

            <Accordion
              title="Edit"
              content={
                <div>
                  <ul>
                    {["All", "Edit", "Deleted"].map((item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Course"]?.["Edit"]?.has(item)
                            }
                            onChange={() =>
                              handleCheckboxChange("Course", "Edit", item)
                            }
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <Accordion
                    title="Status"
                    content={
                      <div>
                        <ul>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedValues["Course"]?.["Status"]?.has(
                                    "All"
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    "Course",
                                    "Status",
                                    "All"
                                  )
                                }
                              />
                              All
                            </label>
                          </li>
                        </ul>

                        {["Active", "Block", "Suspend"].map((status) => (
                          <Accordion
                            key={status}
                            title={status}
                            content={
                              <ul>
                                {["Active", "Block", "Suspend"].map(
                                  (option) => (
                                    <li key={option}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={
                                            !!selectedValues["Course"]?.[
                                              "Status"
                                            ]?.has(option)
                                          }
                                          onChange={() =>
                                            handleCheckboxChange(
                                              "Course",
                                              "Status",
                                              option
                                            )
                                          }
                                        />
                                        {option}
                                      </label>
                                    </li>
                                  )
                                )}
                              </ul>
                            }
                          />
                        ))}
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        }
      />
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Videos"]}
              onChange={() => handleCheckboxChange("Videos", "All", "Videos")}
            />
            Videos
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          !!selectedValues["Videos"]?.["View"]?.has("All")
                        }
                        onChange={() =>
                          handleCheckboxChange("Videos", "View", "All")
                        }
                      />
                      All
                    </label>
                  </li>
                </ul>
              }
            />

            <Accordion
              title="Edit"
              content={
                <div>
                  <ul>
                    {["All", "Edit", "Deleted"].map((item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Videos"]?.["Edit"]?.has(item)
                            }
                            onChange={() =>
                              handleCheckboxChange("Videos", "Edit", item)
                            }
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <Accordion
                    title="Status"
                    content={
                      <div>
                        <ul>
                          <li>
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  !!selectedValues["Videos"]?.["Status"]?.has(
                                    "All"
                                  )
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    "Videos",
                                    "Status",
                                    "All"
                                  )
                                }
                              />
                              All
                            </label>
                          </li>
                        </ul>

                        {["Active", "Block", "Suspend"].map((status) => (
                          <Accordion
                            key={status}
                            title={status}
                            content={
                              <ul>
                                {["Active", "Block", "Suspend"].map(
                                  (option) => (
                                    <li key={option}>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={
                                            !!selectedValues["Videos"]?.[
                                              "Status"
                                            ]?.has(option)
                                          }
                                          onChange={() =>
                                            handleCheckboxChange(
                                              "Videos",
                                              "Status",
                                              option
                                            )
                                          }
                                        />
                                        {option}
                                      </label>
                                    </li>
                                  )
                                )}
                              </ul>
                            }
                          />
                        ))}
                      </div>
                    }
                  />
                </div>
              }
            />
          </div>
        }
      />

      {/* Examinee Section */}
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Examinee"]}
              onChange={() =>
                handleCheckboxChange("Examinee", "All", "Examinee")
              }
            />
            Examinee
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          !!selectedValues["Examinee"]?.["View"]?.has("All")
                        }
                        onChange={() =>
                          handleCheckboxChange("Examinee", "View", "All")
                        }
                      />
                      All
                    </label>
                  </li>
                </ul>
              }
            />

            <Accordion
              title="Edit"
              content={
                <div>
                  <ul>
                    {["All", "Edit", "Deleted"].map((item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Examinee"]?.["Edit"]?.has(item)
                            }
                            onChange={() =>
                              handleCheckboxChange("Examinee", "Edit", item)
                            }
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </div>
        }
      />

      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Examination Center"]}
              onChange={() =>
                handleCheckboxChange(
                  "Examination Center",
                  "All",
                  "Examination Center"
                )
              }
            />
            Examination Center
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <ul>
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={
                          !!selectedValues["Examination Center"]?.["View"]?.has(
                            "All"
                          )
                        }
                        onChange={() =>
                          handleCheckboxChange(
                            "Examination Center",
                            "View",
                            "All"
                          )
                        }
                      />
                      All
                    </label>
                  </li>
                </ul>
              }
            />

            <Accordion
              title="Edit"
              content={
                <ul>
                  {["All", "Edit", "Deleted"].map((item) => (
                    <li key={item}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Examination Center"]?.[
                              "Edit"
                            ]?.has(item)
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              "Examination Center",
                              "Edit",
                              item
                            )
                          }
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        }
      />

      {/* Live Chat */}
      <Accordion
        title={
          <div className="flex items-center justify-center gap-4">
            <input
              type="checkbox"
              checked={!!selectedValues["Live Chat"]}
              onChange={() =>
                handleCheckboxChange("Live Chat", "All", "Live Chat")
              }
            />
            Live Chat
          </div>
        }
        content={
          <div>
            <Accordion
              title="View"
              content={
                <ul>
                  {["Course", "Payment", "Withdraw", "Report", "Advice"].map(
                    (item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedValues["Live Chat"]?.["View"]?.has(item)
                            }
                            onChange={() =>
                              handleCheckboxChange("Live Chat", "View", item)
                            }
                          />
                          {item}
                        </label>
                      </li>
                    )
                  )}
                </ul>
              }
            />

            <Accordion
              title="Edit"
              content={
                <ul>
                  {[
                    "All",
                    "Course",
                    "Payment",
                    "Withdraw",
                    "Report",
                    "Advice",
                  ].map((item) => (
                    <li key={item}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            !!selectedValues["Live Chat"]?.["Edit"]?.has(item)
                          }
                          onChange={() =>
                            handleCheckboxChange("Live Chat", "Edit", item)
                          }
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        }
      />
    </div>
  );
}
